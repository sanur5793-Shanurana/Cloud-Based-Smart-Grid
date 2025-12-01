import express from "express";
import { addDevice, getDevices } from "../controllers/deviceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", protect, allowRoles(["admin"]), addDevice);
router.get("/", protect, getDevices);

export default router;

