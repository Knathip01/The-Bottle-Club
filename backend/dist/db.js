"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: ((_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.includes('localhost')) ? false : {
        rejectUnauthorized: false,
    },
});
const query = (text, params) => pool.query(text, params);
exports.query = query;
exports.default = pool;
