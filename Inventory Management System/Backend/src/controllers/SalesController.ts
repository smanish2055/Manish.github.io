import { NextFunction, Request, Response } from "express";
import * as salesService from "../services/SalesService";
import HttpStatus from "http-status-codes";
import Sales from "../models/Sales";

export const salesController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salesproduct: Sales = req.body;

    if (!res.locals.user) {
      // Handle the case when the user is not authenticated
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user_id = res.locals.user.id;
    const response = await salesService.AddSales(user_id, salesproduct);
    res.status(HttpStatus.ACCEPTED).json({
      message: "sales added successfully",
      response: response,
    });
  } catch (error) {
    next(error);
  }
};
