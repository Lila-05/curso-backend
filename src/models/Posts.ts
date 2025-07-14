import mongoose, { Schema } from "mongoose";
import { Posts } from "../types/PostsTypes";

const PostsSchema: Schema = new Schema<Posts>(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const PostsModel = mongoose.model<Posts>("Posts", PostsSchema)