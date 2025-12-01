import Logs from "../models/Logs.js";

export const logAccess = async (req, res) => {
    const log = await Logs.create(req.body);
    res.json(log);
};

export const getLogs = async (req, res) => {
    const logs = await Logs.find().populate("userId deviceId");
    res.json(logs);
};
