import { Request, Response, NextFunction, json } from "express";
import { ItemModel } from "../sqlModel/todoItemModel";
import { STATUS } from "../sqlModel/Types/ITodoItemModel";
import { TodoModel } from "../sqlModel/todoModel";
import { Transaction, transaction } from "objection";
import knex from "knex";
import { Result, check } from "express-validator";

export class itemController {
  static getAllItem = async (req: Request, res: Response) => {
    try {
      const allItem = await ItemModel.query()
        .select("id", "item", "status")
        .withGraphFetched("todo");
      return res.send(allItem);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  };

  static getAllItemById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const itemwithId = await ItemModel.query()
        .findById(id)
        .withGraphFetched("todo");
      if (id != itemwithId?.id) {
        return res.status(404).send("item not found");
      }
      return res.send(itemwithId);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  };

  static updateItem = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const itemText = req.body.item;
      const result = await ItemModel.query().updateAndFetchById(id, {
        item: itemText,
      });
      if (result) {
        return res.send(result);
      } else {
        return res.status(404).send("no text found");
      }
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  };

  static updateItemStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const status: STATUS = req.body.status;

      const result = await ItemModel.transaction(async (trx) => {
        const updateItem = await ItemModel.query(trx).patchAndFetchById(id, {
          status: status,
        });

        const pendingItems = await ItemModel.query(trx)
          .select("id")
          .where("todo_id", updateItem.todo_id)
          .andWhere("status", STATUS.PENDING);

        if (!pendingItems.length) {
          //Update todo status to complete.
          await TodoModel.query(trx).patchAndFetchById(updateItem.todo_id, {
            status: STATUS.COMPLETED,
          });
        }
        return updateItem;
      });

      res.send(result);
    } catch (err: any) {
      return console.log(err.message);
    }
  };

  //***************************/

  static edit = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let status: STATUS = req.body.status;
      const updateItem = await ItemModel.query().patchAndFetchById(id, {
        status: status,
      });
      const todo = await TodoModel.query()
        .patchAndFetchById(updateItem.todo_id, { status: STATUS.PENDING })
        .withGraphFetched("item");

      //     // use the todo id to fetch the count for all todo items, where status is pending.
      //     // if count is 0, update the status of todo to completed. else leave as pending.

      const items = await todo
        .$relatedQuery("item")
        .where({ status: STATUS.PENDING });
      // console.log(items);

      if (items.length == 0) {
        const isCompleted = await TodoModel.query()
          .updateAndFetchById(updateItem.todo_id, { status: STATUS.COMPLETED })
          .withGraphFetched("item");

        return res.send({
          message: `All items have been completed`,
          isCompleted,
        });
      } else {
        return res.send({ message: `items not yet completed`, todo });
      }
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  };

  //******************************************/

  static deleteItem = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedItem = await ItemModel.query().deleteById(id);
      if (deletedItem) {
        return res.send("item deleted");
      }
      return res.status(404).send("item not found");
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  };
}
