import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ["admin", "operator", "viewer"],
        default: "viewer"
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
