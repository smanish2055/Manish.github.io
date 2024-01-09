import { Router } from "express";
import { salesController } from "../controllers/SalesController";
const router = Router();

router.post('/', salesController);

export default router;