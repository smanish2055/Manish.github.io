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


export const getSalesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const salesproduct: Sales = req.body;

    // if (!res.locals.user) {
    //   // Handle the case when the user is not authenticated
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    const user_id = res.locals.user.id;
    const response = await salesService.getSalesService(user_id);
    res.status(HttpStatus.ACCEPTED).json({
      message: "get sales successfully",
      response: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSalesController = async (req: Request, res: Response, next: NextFunction) => { 
   try {
     const id = +req.params.id;
     const response = await salesService.deleteSalesService(id);
     res.status(HttpStatus.ACCEPTED).json({
       message: "deleted sale successfully",
       response: response,
     });
   } catch (error) {
     next(error);
   }
};