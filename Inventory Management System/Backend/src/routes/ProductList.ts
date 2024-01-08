import { Router } from "express";
import {
  getAllProductList,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/ProductListController";
const router = Router();

router.get("/", getAllProductList);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
