// src/routes/categoryRoutes.js
import express from "express";
import { createMenu, getMenus } from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getMenus)
router.post("/", createMenu);

export default router;
