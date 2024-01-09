import { NextFunction, Request, Response } from "express";
import * as AddProductService from "../services/AddProductsService";
import Product from "../models/Product";
import HttpStatus from "http-status-codes";

export const AddProductsController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: Product = req.body;

    if (!res.locals.user) {
      // Handle the case when the user is not authenticated
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user_id = res.locals.user.id;
    const response = await AddProductService.AddProductService(user_id, product);
    res.status(HttpStatus.ACCEPTED).json({
      message: "product added successfully",
      response:  response,
    });
  } catch (error) {
    next(error);
  }
};
