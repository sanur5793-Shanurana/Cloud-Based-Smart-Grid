import Device from "../models/Device.js";

export const addDevice = async (req, res) => {
    const device = await Device.create(req.body);
    res.json(device);
};

export const getDevices = async (req, res) => {
    const devices = await Device.find();
    res.json(devices);
};
