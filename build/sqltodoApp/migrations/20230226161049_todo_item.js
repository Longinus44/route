"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("todo_item", (table) => {
        table.uuid("id").primary();
        table.string("todo_id").references("id").inTable("todo");
        table.string("item").notNullable;
        table.enum("status", ["completed", "pending"]).defaultTo("pending");
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("todo_item");
}
exports.down = down;
