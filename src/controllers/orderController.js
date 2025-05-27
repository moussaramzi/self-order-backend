import * as orderFacade from "../facade.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order for the self-ordering system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Internal server error
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const order = await orderFacade.createOrder(items);
  res.status(201).json(order);
});

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Fetch all orders from the database
 *     responses:
 *       200:
 *         description: A list of orders
 *       500:
 *         description: Internal server error
 */
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderFacade.getOrders();
  res.status(200).json(orders);
});
