
import { Request, Response } from 'express';
import { todoService } from '../services/todoServices';

export const todoController = {
    getTodos: (req: Request, res: Response): void => {
        const todos = todoService.getTodos();
        res.json(todos);
    },

    addTodo: (req: Request, res: Response): void => {
        const { title } = req.body;
        const newTodo = todoService.addTodo(title);
        res.json(newTodo);
    },

    deleteTodo: (req: Request, res: Response): void => {
        const { id } = req.params;
        const todoId = parseInt(id, 10);
        todoService.deleteTodo(todoId);
        res.json({ message: 'Todo deleted successfully' });
    },
};
