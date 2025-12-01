import Device from "../models/Device.js";

export const apiKeyCheck = async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey)
        return res.status(401).json({ message: "API Key required" });

    const device = await Device.findOne({ apiKey });

    if (!device)
        return res.status(401).json({ message: "Invalid API Key" });

    req.device = device;
    next();
};
