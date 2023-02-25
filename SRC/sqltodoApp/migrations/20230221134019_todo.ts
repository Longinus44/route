import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("todo", (table) => {
    table.uuid("id").primary();
    table.string("title").notNullable;
    table.string("item").notNullable;
    table.string("user_id").references("id").inTable("user");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("todo");
}
