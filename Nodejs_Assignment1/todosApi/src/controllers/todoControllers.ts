import { Request, Response } from 'express';
import {todoService} from '../services/todoServices'; // assuming todoService.ts exports the service object

const getTodos = (req: Request, res: Response): void => {
    const todos = todoService.getTodos();
    res.json(todos);
};

const addTodo = async (req: Request, res: Response)=> {
    const {id, title } = req.body;
    const newTodo = todoService.addTodo(id,title);
    res.json(newTodo);
};

const deleteTodo = async (req: Request, res: Response)=> {
    const { id } = req.params;
    const todoId = parseInt(id);
    todoService.deleteTodo(todoId);
    res.json({ message: 'Todo deleted successfully' });
};

export const todoController = {
    getTodos,
    addTodo,
    deleteTodo,
};
