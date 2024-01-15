import { Router } from "express";
import {
  salesController,
  getSalesController,
  deleteSalesController,
} from "../controllers/SalesController";
const router = Router();

router.post("/", salesController);
router.get("/", getSalesController);
router.delete("/:id", deleteSalesController);

export default router;
