import { Request, Response, NextFunction } from "express";
import * as userService from "../services/ProductListService";
import HttpStatus from "http-status-codes";
import Product from "../models/Product";

export const getAllProductList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const user_id = res.locals.user.id;
    const allProducts: Product[] = await userService.getAllProductList(user_id);
    res.status(HttpStatus.ACCEPTED).json({
      message: "product Fetch Successfully",
      result: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = res.locals.user.id;
  try {
    const product: any = await userService.getProductById(user_id);
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Fetch Success",
      result: product,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id:number = +req.params.id;
  try {
    const deletedProduct: any = await userService.deleteProductById(id);
    res.status(HttpStatus.ACCEPTED).json({
      message: "Product Deleted Successfully",
      result: deletedProduct,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.id;
  const body:Product=req.body;
  try {
    const updatedProduct: any = await userService.updateProductById(id, body);
    console.log(updatedProduct);
    res.status(HttpStatus.ACCEPTED).json({
      message: "Product is updated successfully",
      result: updatedProduct,
    });
  } catch (error: any) {
    next(error);
  }
};
