import express from "express";
import { UserModel, TagModel, ContentModel, LinkModel } from "./db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {DB_URL, JWTPASSKEY} from "./config";
import { UserMiddleware } from "./middleware";
import {random} from "./utils"
mongoose.connect(DB_URL);
const app = express();

app.use(express.json());

app.post("/api/v1/signUp" , async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    await UserModel.create({
        userName: userName,
        password: password
    })
    res.json({
        message: "user signed up"
    })
})

app.post("/api/v1/signIn", async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        userName,
        password
    });
    if(existingUser)
    {
        const token = jwt.sign({
            id: existingUser._id
        }, JWTPASSKEY);
        res.json({
            token
        })
    }
    else{
        res.status(401).json({
            message: "user doesnot exist."
        })
    }
})

app.post("/api/v1/content", UserMiddleware, async(req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    //@ts-ignore
    const userId = req.userId;
    await ContentModel.create({
        userId: userId,
        type: type,
        link: link,
        tags: [],
        title: title
    })
    res.json({
        message: "content createdl"
    })
})

app.get("/api/v1/content", UserMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    // console.log(userId);
    const content = await ContentModel.find({
        userId: userId
    }).populate({path: "UserId",strictPopulate: false});
    res.json({
        content
    })
})

app.delete("/api/v1/content", UserMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    console.log(contentId);
    const result = await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        result,
        message: "deleted"
    })
})

app.post("/api/v1/brain", UserMiddleware, async (req, res) => {
    //@ts-ignore
    const _id = req.userId;
    const shared = req.body.shared;
    if(shared){
    const link = await LinkModel.findOne({
        userId: _id
    })
    if(link)
    {
        res.json({
            link
        })
        return;
    }
    const hash = random(10);
    await LinkModel.create({
        userId: _id,
        link: hash
    })
    res.json({
        hash
    })
    return;
}
   const link = await LinkModel.deleteOne({
    userId: _id
   }) 
   if(link)
   {
    res.json({
        message: "deleted sharable link"
    })
   }
   else{
    res.json({
        message: "link is not yet shared to delete"
    })
   }
})

app.get("/api/v1/brain/:sharedHash", async (req, res) => {
    const sharedHash = req.params.sharedHash;
    console.log(sharedHash);
    const link = await LinkModel.findOne({
        link: sharedHash
    })
    if(link)
    {
        const _id = link.userId;
        const content = await ContentModel.find({
            userId: _id
        })
        res.json({
            content
        })
        return;
    }
    res.status(401).json({
        message: "link not found"
    })
})

app.listen(3000);