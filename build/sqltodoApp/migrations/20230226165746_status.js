"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable("todo", (table) => {
        table.enum("status", ["completed", "pending"]).defaultTo("pending");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable("todo", (table) => {
        table.dropColumn("item");
    });
}
exports.down = down;
