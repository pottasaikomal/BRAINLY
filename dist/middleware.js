"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const UserMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    // console.log(req);
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWTPASSKEY);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
};
exports.UserMiddleware = UserMiddleware;
