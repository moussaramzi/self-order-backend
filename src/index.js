import express from "express";
import bodyParser from "body-parser";
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";    
import ingredientRoutes from './routes/ingredientRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import { swaggerDocs, swaggerUi } from "./swagger.js";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);
app.use("/menus", menuRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/orders", orderRoutes);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
