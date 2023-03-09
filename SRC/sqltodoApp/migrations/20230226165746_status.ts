import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("todo", (table) => {
    table.enum("status", ["completed", "pending"]).defaultTo("pending");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("todo", (table) => {
    table.dropColumn("item");
  });
}
