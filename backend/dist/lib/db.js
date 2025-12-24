"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.db = (0, postgres_js_1.drizzle)(pool);
//# sourceMappingURL=db.js.map