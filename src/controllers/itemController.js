// src/controllers/itemController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: Fetch all items from the database
 *     responses:
 *       200:
 *         description: A list of items
 */
export const getItems = async (req, res) => {
  try {
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
    
    // Filter items by categoryId if provided
    const items = await prisma.item.findMany({
      where: categoryId ? {
        categoryId: categoryId
      } : {},
      include: { 
        category: true, 
        itemIngredients: {
          include: {
            ingredient: true
          }
        }
      },
    });
    
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /items/{id}/ingredients:
 *   get:
 *     summary: Get ingredients for a specific item
 *     description: Fetch all ingredients associated with a specific item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of ingredients
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
export const getItemIngredients = async (req, res) => {
  const { id } = req.params;

  try {
    const itemIngredients = await prisma.itemIngredient.findMany({
      where: { itemId: parseInt(id, 10) },
      include: { ingredient: true },
    });

    if (!itemIngredients || itemIngredients.length === 0) {
      return res.status(404).json({ error: "No ingredients found for this item." });
    }

    // Return only the ingredients
    const ingredients = itemIngredients.map((ii) => ii.ingredient);
    res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Add a new item to the database
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Internal server error
 */
export const createItem = async (req, res) => {
  const { name, price, categoryId, ingredients } = req.body;

  // Check if ingredients array is provided and has at least one ingredient
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "An item must have at least one ingredient." });
  }

  try {
    // Create the item first
    const item = await prisma.item.create({
      data: {
        name,
        price,
        categoryId,
        itemIngredients: {
          create: ingredients.map(ingredientId => ({
            ingredientId: ingredientId,
          })),
        },
      },
    });

    // Return the created item along with the associated ingredients
    const createdItem = await prisma.item.findUnique({
      where: { id: item.id },
      include: {
        itemIngredients: {
          include: {
            ingredient: true, 
          },
        },
      },
    });

    res.status(201).json(createdItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

