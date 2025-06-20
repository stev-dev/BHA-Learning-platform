import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    roles: [{ type: String, enum: ["student", "instructor", "admin"] }],
});

export default models.User || model("User", UserSchema); 