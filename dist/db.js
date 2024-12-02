"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.TagModel = exports.UserModel = exports.LinkModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const contentType = ['Image', 'Video', 'Audio', 'Article'];
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, unique: true },
    password: String
});
const ContentSchema = new mongoose_1.Schema({
    link: String,
    title: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", require: true },
    type: { type: String, enum: contentType, require: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: "Tag" }]
});
const TagSchema = new mongoose_1.Schema({
    title: { type: String, require: true, unique: true }
});
const LinkSchema = new mongoose_1.Schema({
    link: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", require: true, unique: true }
});
exports.LinkModel = (0, mongoose_1.model)("Link", LinkSchema);
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.TagModel = (0, mongoose_1.model)("Tag", TagSchema);
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
