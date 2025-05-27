import { asyncHandler } from "../utils/asyncHandler.js";
import * as facade from "../facade.js";

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients
 *     description: Fetch all ingredients from the database
 *     responses:
 *       200:
 *         description: A list of ingredients
 *       500:
 *         description: Internal server error
 */
export const getIngredients = asyncHandler(async (req, res) => {
  const ingredients = await facade.getIngredients();
  res.status(200).json(ingredients);
});

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     description: Add a new ingredient to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 example: 1.5
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *       500:
 *         description: Internal server error
 */
export const createIngredient = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const ingredient = await facade.createIngredient({ name, price });
  res.status(201).json(ingredient);
});