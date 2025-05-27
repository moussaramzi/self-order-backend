import * as itemFacade from "../facade.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
export const getItems = asyncHandler(async (req, res) => {
  const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
  const items = await itemFacade.getItems(categoryId);
  res.status(200).json(items);
});

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
export const getItemIngredients = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ingredients = await itemFacade.getItemIngredients(parseInt(id, 10));
  if (!ingredients || ingredients.length === 0) {
    return res.status(404).json({ error: "No ingredients found for this item." });
  }
  res.status(200).json(ingredients);
});

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
export const createItem = asyncHandler(async (req, res) => {
  const { name, price, categoryId, ingredients, imageUrl } = req.body;
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "An item must have at least one ingredient." });
  }
  const createdItem = await itemFacade.createItem({ name, price, categoryId, ingredients, imageUrl });
  res.status(201).json(createdItem);
});