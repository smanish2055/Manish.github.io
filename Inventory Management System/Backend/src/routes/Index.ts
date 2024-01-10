import { Router } from "express";
import auth from "./Auth";
import Dashboard from "./DashboardRoute";
import AddProductRoute from "./AddProductsRoute";
import ProductList from "./ProductList";
import Sales from "./SalesRoute";
import { jwtAuth } from "../middlewares/jwtAuth";
// import {Dashboard} from "./DashboardRoute"
const router = Router();

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
/* --------------------------- Initial Home Route --------------------------- */
router.get("/", (req, res) => {
  res.json({
    message: "Hello World !!",
  });
});

// routes
router.use(auth);
router.use("/dashboard", jwtAuth, Dashboard);
router.use("/add-product", jwtAuth, AddProductRoute);
router.use("/product-list", jwtAuth, ProductList);
router.use("/sales", jwtAuth, Sales);

export default router;
