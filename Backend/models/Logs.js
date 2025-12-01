import mongoose from "mongoose";

const LogsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Logs", LogsSchema);
