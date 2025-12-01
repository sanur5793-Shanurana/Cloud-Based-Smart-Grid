import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
    name: { type: String, required: true },
    rules: { type: Object, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Policy", PolicySchema);
