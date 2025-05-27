import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";    
import ingredientRoutes from './routes/ingredientRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";

import { swaggerDocs, swaggerUi } from "./swagger.js";

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
// Middleware
app.use((req, res, next) => {
  if (req.is('application/json')) {
    bodyParser.json()(req, res, next);
  } else {
    next();
  }
});
// Routes
app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);
app.use("/menus", menuRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/orders", orderRoutes);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
