// src/routes/itemRoutes.js
import express from "express";
import upload, { deleteUploadedImage } from "../middleware/uploadMiddleware.js";
import { getItems, getItemIngredients } from "../controllers/itemController.js";
import * as itemFacade from "../facade.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id/ingredients", getItemIngredients);

router.post("/", upload.single("image"), async (req, res) => {
  const { name, price, categoryId } = req.body;

  let ingredients = [];
  try {
    ingredients = JSON.parse(req.body.ingredients);
  } catch {
    return res.status(400).json({ error: "Ingredients must be a valid JSON array." });
  }

  if (!name || !price || !categoryId || !ingredients.length || !req.file) {
    if (req.file) deleteUploadedImage(req.file.filename);
    return res.status(400).json({ error: "Missing required fields or image." });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  try {
    const item = await itemFacade.createItem({
      name,
      price: parseFloat(price),
      categoryId: parseInt(categoryId),
      ingredients,
      imageUrl,
    });

    res.status(201).json(item);
  } catch (error) {
    if (req.file) deleteUploadedImage(req.file.filename);
    res.status(500).json({ error: error.message });
  }
});

export default router;
