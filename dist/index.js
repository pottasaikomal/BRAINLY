"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
mongoose_1.default.connect("mongodb+srv://20cs01002:5AlJFtVk8QKD13pe@projects.t9x2v.mongodb.net/Brainly");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    yield db_1.UserModel.create({
        userName: userName,
        password: password
    });
    res.json({
        message: "user signed up"
    });
}));
app.post("/api/v1/signIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        userName,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWTPASSKEY);
        res.json({
            token
        });
    }
    else {
        res.status(401).json({
            message: "user doesnot exist."
        });
    }
}));
app.post("/api/v1/content", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    //@ts-ignore
    const userId = req.userId;
    yield db_1.ContentModel.create({
        userId: userId,
        type: type,
        link: link,
        tags: [],
        title: title
    });
    res.json({
        message: "content createdl"
    });
}));
app.get("/api/v1/content", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    // console.log(userId);
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate({ path: "UserId", strictPopulate: false });
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    console.log(contentId);
    const result = yield db_1.ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        result,
        message: "deleted"
    });
}));
app.listen(3000);
