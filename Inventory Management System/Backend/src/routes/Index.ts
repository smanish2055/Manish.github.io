import { Router } from "express";
import auth from "./Auth";
import productlist from "./ProductList";
import AddProductRoute from "./AddProductsRoute";
import { jwtAuth } from "../middlewares/jwtAuth";
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


// Authentication routes
router.use(auth);
// User routes
// router.use("/dashboard", jwtAuth, dashboard);
router.use("/productlist", jwtAuth, productlist);
router.use("/addproduct", jwtAuth, AddProductRoute);

export default router;
