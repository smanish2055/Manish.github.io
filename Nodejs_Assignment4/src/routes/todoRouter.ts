import express, { Request, Response } from "express";
import { todoController } from "../controllers/todoControllers";
import { seqController } from "../controllers/sequlizeController";
import Joi from "joi";
import logger from "../loggers/logger"; // Import the logger

import { todoValidationSchema } from "../validations/todosValidate";
const router = express.Router();

router.get("/todos", todoController.getTodos);
router.get("/todospagination", todoController.getTodos);

router.post("/todos", async (req: Request, res: Response) => {
  try {
    const { error } = todoValidationSchema.validate(req.body);

    if (error) {
      logger.error("Validation Error:", error); // Log validation errors
      return res.status(400).json({
        message: "😒",
        error: error.details[0].message,
      });
    }

    // Call the addTodo function
    await todoController.addTodo(req, res);
  } catch (error) {
    logger.error("Error adding todo:", error); // Log other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { error } = todoValidationSchema.validate(req.body);

    if (error) {
      logger.error("Validation Error:", error); // Log validation errors
      return res.status(400).json({
        message: "😒",
        error: error.details[0].message,
      });
    }

    // Call the addTodo function
    await todoController.updateTodo(req, res);
  } catch (error) {
    logger.error("Error updating todo:", error); // Log other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    // Validate the todo ID
    const { error } = Joi.number().required().validate(Number(req.params.id));

    if (error) {
      logger.error("Validation Error:", error); // Log validation errors
      return res.status(400).json({ error: "Invalid todo ID" });
    }

    // Call the deleteTodo function with the validated ID
    await todoController.deleteTodo(req, res);
  } catch (error) {
    logger.error("Error deleting todo:", error); // Log other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/todosinsert", async (req: Request, res: Response) => {
  try {
    const { error } = todoValidationSchema.validate(req.body);

    if (error) {
      logger.error("Validation Error:", error);
      return res.status(400).json({
        message: "😒",
        error: error.details[0].message,
      });
    }

    // Call the insertTodo function from the controller
    await seqController.insertTodo(req, res);
  } catch (error) {
    logger.error("Error adding todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
