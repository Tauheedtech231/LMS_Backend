// routes/moduleRoutes.js
import express from "express";
import { getModules, getModuleById } from "../controllers/moduleControllers.js";

const router = express.Router();

router.get("/", getModules);      // GET /api/modules
router.get("/:id", getModuleById); // GET /api/modules/:id

export default router;
