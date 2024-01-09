import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
const router = Router();

router.get("/", DashboardController);


export default router;
