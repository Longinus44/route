import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("todo_item", (table) => {
    table.uuid("id").primary();
    table.string("todo_id").references("id").inTable("todo");
    table.string("item").notNullable;
    table.enum("status", ["completed", "pending"]).defaultTo("pending");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("todo_item");
}
