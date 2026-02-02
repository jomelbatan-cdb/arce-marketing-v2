import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/categories.controller";
import { adminAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", adminAuth, create);
router.get("/", getAll);

router.get("/:id", getOne);
router.put("/:id", adminAuth, update);
router.delete("/:id", adminAuth, remove);

export default router;
