import { Router } from "express";
import {
  createVariation,
  getVariations,
  getVariation,
  updateVariation,
  deleteVariation,
  getVariationsByProduct,
} from "../controllers/variation.controller";
import { adminAuth } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/:productId", adminAuth, upload.any(), createVariation);
router.get("/", getVariations);
router.get("/:id", getVariation);
router.put("/:id", adminAuth, upload.any(), updateVariation);
router.delete("/:id", adminAuth, deleteVariation);

router.get("/product/:productId", getVariationsByProduct);

export default router;
