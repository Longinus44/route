"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("todo", (table) => {
        table.uuid("id").primary();
        table.string("title").notNullable;
        table.string("item").notNullable;
        table.string("user_id").references("id").inTable("user");
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("todo");
}
exports.down = down;
