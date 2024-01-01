
import express from 'express';
import { todoController } from '../controllers/todoControllers';

const router = express.Router();

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.addTodo);
router.delete('/todos/:id', todoController.deleteTodo);

export default router;
