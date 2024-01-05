import { Request, Response } from "express";
import {  TodoService } from "../services/todoServices"; // assuming todoService.ts exports the service object


 
 
const insertTodo = async (req: Request, res: Response) => {
  const todoAdd = req.body;
  const newTodo = TodoService.insertTodo(todoAdd);
  res.json(newTodo);
};


export const seqController = {
  insertTodo
};