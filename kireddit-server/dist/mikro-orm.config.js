"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    dbName: "kireddit",
    user: "postgres",
    password: "postgres",
    type: "postgresql",
    debug: !constants_1.__prod__,
    entities: [Post_1.Post],
    migrations: {
        path: path_1.default.join(__dirname, "/migrations"),
        pattern: /^[\w-]+\d+\.[jt]s$/
    }
};
//# sourceMappingURL=mikro-orm.config.js.map