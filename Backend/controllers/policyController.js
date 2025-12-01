import Policy from "../models/Policy.js";

export const createPolicy = async (req, res) => {
    const policy = await Policy.create(req.body);
    res.json(policy);
};

export const getPolicies = async (req, res) => {
    const policies = await Policy.find();
    res.json(policies);
};
