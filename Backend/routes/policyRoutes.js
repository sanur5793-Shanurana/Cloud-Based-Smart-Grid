import express from "express";
import { createPolicy, getPolicies } from "../controllers/policyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", protect, allowRoles(["admin"]), createPolicy);
router.get("/", protect, getPolicies);

export default router;
