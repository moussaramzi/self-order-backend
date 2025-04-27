import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


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
export const getMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
export const createMenu = async (req, res) => {
  const { name, price } = req.body;
  try {
    const menu = await prisma.menu.create({
      data: { name, price },
    });
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
