import { asyncHandler } from "../utils/asyncHandler.js";
import * as facade from "../facade.js";

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Fetch all categories from the database
 *     responses:
 *       200:
 *         description: A list of categories
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await facade.getCategories();
  res.status(200).json(categories);
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Add a new category to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Burgers
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Internal server error
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await facade.createCategory({ name });
  res.status(201).json(category);
});