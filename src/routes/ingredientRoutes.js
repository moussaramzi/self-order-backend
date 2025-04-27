// src/routes/ingredientRoutes.js
import express from 'express';
import { getIngredients, createIngredient } from '../controllers/ingredientController.js';

const router = express.Router();

router.get('/', getIngredients);
router.post('/', createIngredient);

export default router;
