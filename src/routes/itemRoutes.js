// src/routes/categoryRoutes.js
import express from "express";
import { getItems, createItem, getItemIngredients } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id/ingredients", getItemIngredients); 
router.post("/", createItem);

export default router;
