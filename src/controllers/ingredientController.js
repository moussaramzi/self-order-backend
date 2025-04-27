// src/controllers/ingredientController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
export const getIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
export const createIngredient = async (req, res) => {
  const { name, price } = req.body;
  try {
    const ingredient = await prisma.ingredient.create({
      data: { name, price },
    });
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
