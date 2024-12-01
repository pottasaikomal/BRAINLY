import mongoose, {model, Schema, Types} from "mongoose";

const contentType = ['Image', 'Video', 'Audio', 'Article'];
const UserSchema = new Schema({
    userName: {type: String, unique: true},
    password: String
})

const ContentSchema = new Schema({
    link: String,
    title: String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", require: true},
    type: {type: String, enum:contentType, require: true},
    tags: [{type: Types.ObjectId, ref: "Tag"}]
})

const TagSchema = new Schema({
    title: {type: String, require: true, unique: true}
})

export const UserModel = model("User", UserSchema);
export const TagModel = model("Tag", TagSchema);
export const ContentModel = model("Content", ContentSchema);