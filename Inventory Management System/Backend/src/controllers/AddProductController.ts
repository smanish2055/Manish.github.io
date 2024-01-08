import { NextFunction, Request, Response } from "express";
import * as AddProductService from "../services/AddProductsService";
import HttpStatus from "http-status-codes";

export const AddProductsController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: any = req.body;

    if (!res.locals.user) {
      // Handle the case when the user is not authenticated
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user_id = res.locals.user.id;
    const response =  AddProductService.AddProductService(user_id, product);
    res.status(HttpStatus.ACCEPTED).json({
      message: "product added successfully",
      response:  response,
    });
  } catch (error) {
    next(error);
  }
};
