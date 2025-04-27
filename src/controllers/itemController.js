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
    const items = await prisma.item.findMany({
      include: { category: true, itemIngredients: true },
    });
    res.status(200).json(items);
  } catch (error) {
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

