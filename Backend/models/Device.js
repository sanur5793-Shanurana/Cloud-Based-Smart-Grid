import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
    deviceName: { type: String, required: true },
    deviceId: { type: String, required: true, unique: true },
    apiKey: { type: String, required: true, unique: true },
    zone: { type: String, required: true },
    allowedRoles: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Device", DeviceSchema);
