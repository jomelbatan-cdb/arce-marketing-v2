import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import AuthRouter from "./routes/auth.routes";
import ProductRouter from "./routes/product.routes";
import CategoryRouter from "./routes/category.routes";
import VariationRouter from "./routes/variation.routes";

import { connectDB } from "./config/db";
import { ENV } from "./config/env";

import { createServer } from "http";

const PORT = ENV.PORT;

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use("/api/auth", AuthRouter);
app.use("/api/product", ProductRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/variation", VariationRouter);

// ✅ Create HTTP server
const server = createServer(app);

// ✅ Start server
server.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
