import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getShowcaseProduct,
  getRecommendation,
} from "../controllers/product.controller";
import { adminAuth } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
router.post("/", adminAuth, upload.any(), createProduct);
router.get("/", getProducts);
router.get("/recommendation/:categoryId/:productId", getRecommendation);
router.get("/showcase", getShowcaseProduct);
router.get("/:id", getProductById);
router.put("/:id", adminAuth, upload.array("images", 10), updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

export default router;
