import * as menuFacade from "../facade.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Get all menus
 *     description: Fetch all menus from the database
 *     responses:
 *       200:
 *         description: A list of menus
 */
export const getMenus = asyncHandler(async (req, res) => {
  const menus = await menuFacade.getMenus();
  res.status(200).json(menus);
});

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a new menu
 *     description: Add a new menu to the database
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Internal server error
 */
export const createMenu = asyncHandler(async (req, res) => {
  const { name, price, imageUrl } = req.body;
  const menu = await menuFacade.createMenu(name, price, imageUrl);
  res.status(201).json(menu);
});