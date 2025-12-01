import express from "express";
import { logAccess, getLogs } from "../controllers/logsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, logAccess);
router.get("/", protect, getLogs);

export default router;
