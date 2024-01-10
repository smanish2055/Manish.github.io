import { Router } from "express";
import {AddProductsController} from "../controllers/AddProductController";
const router = Router();

router.post("/", AddProductsController);
// router.route("/:id").get(getUserById);
export default router;
