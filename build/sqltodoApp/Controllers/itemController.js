"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemController = void 0;
const todoItemModel_1 = require("../sqlModel/todoItemModel");
const ITodoItemModel_1 = require("../sqlModel/Types/ITodoItemModel");
const todoModel_1 = require("../sqlModel/todoModel");
class itemController {
}
exports.itemController = itemController;
_a = itemController;
itemController.getAllItem = async (req, res) => {
    try {
        const allItem = await todoItemModel_1.ItemModel.query()
            .select("id", "item", "status")
            .withGraphFetched("todo");
        return res.send(allItem);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
itemController.getAllItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const itemwithId = await todoItemModel_1.ItemModel.query()
            .findById(id)
            .withGraphFetched("todo");
        if (id != (itemwithId === null || itemwithId === void 0 ? void 0 : itemwithId.id)) {
            return res.status(404).send("item not found");
        }
        return res.send(itemwithId);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
itemController.editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const itemText = req.body.item;
        const editedItem = await todoItemModel_1.ItemModel.query().patchAndFetchById(id, {
            item: itemText,
        });
        if (editedItem) {
            return res.send(editedItem);
        }
        return res.status(404).send("no text to update");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
//....................../
itemController.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const status = req.body.status;
        const result = await todoItemModel_1.ItemModel.transaction(async (trx) => {
            const updateItem = await todoItemModel_1.ItemModel.query(trx).patchAndFetchById(id, {
                status: status,
            });
            const pendingItems = await todoItemModel_1.ItemModel.query(trx)
                .select("id")
                .where("todo_id", updateItem.todo_id)
                .andWhere("status", ITodoItemModel_1.STATUS.PENDING);
            if (!pendingItems.length) {
                //Update todo status to complete.
                await todoModel_1.TodoModel.query(trx).patchAndFetchById(updateItem.todo_id, {
                    status: ITodoItemModel_1.STATUS.COMPLETED,
                });
            }
            return updateItem;
        });
        res.send(result);
        // const todo = await TodoModel.query()
        //   .findById(updateItem.todo_id)
        //   .withGraphFetched("item");
        // const check = await ItemModel.transaction(async (trx) => {
        //   const todo_Items = await todo
        //     ?.$relatedQuery("item")
        //     .where("status", STATUS.PENDING);
        //   if (todo_Items?.length == 0) {
        //     const updateTodoStatus = await TodoModel.query(trx)
        //       .patchAndFetch({ status: STATUS.COMPLETED })
        //       .withGraphFetched("item");
        //     trx.commit();
        //     return res.send(updateTodoStatus);
        //   } else {
        //     const pendingTodo = await todo
        //       ?.$query(trx)
        //       .patchAndFetch({ status: STATUS.PENDING })
        //       .withGraphFetched("item");
        //     trx.rollback();
        //     return res.send(pendingTodo);
        //   }
        // }).catch((err) => {
        //   console.log(err);
        //   return res.status(500).send("transaction encountered error");
        // });
    }
    catch (err) {
        return console.log(err.message);
    }
};
//................../
itemController.updateItemStatus = async (req, res) => {
    try {
        const { id } = req.params;
        let status = req.body.status;
        const updateItem = await todoItemModel_1.ItemModel.query().patchAndFetchById(id, {
            status: status,
        });
        const todo = await todoModel_1.TodoModel.query()
            .patchAndFetchById(updateItem.todo_id, { status: ITodoItemModel_1.STATUS.PENDING })
            .withGraphFetched("item");
        //     // use the todo id to fetch the count for all todo items, where status is pending.
        //     // if count is 0, update the status of todo to completed. else leave as pending.
        const items = await todo
            .$relatedQuery("item")
            .where({ status: ITodoItemModel_1.STATUS.PENDING });
        // console.log(items);
        if (items.length == 0) {
            const isCompleted = await todoModel_1.TodoModel.query()
                .updateAndFetchById(updateItem.todo_id, { status: ITodoItemModel_1.STATUS.COMPLETED })
                .withGraphFetched("item");
            return res.send({
                message: `All items have been completed`,
                isCompleted,
            });
        }
        else {
            return res.send({ message: `items not yet completed`, todo });
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};
itemController.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await todoItemModel_1.ItemModel.query().deleteById(id);
        if (deletedItem) {
            return res.send("item deleted");
        }
        return res.status(404).send("item not found");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
