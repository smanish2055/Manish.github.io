
import { Todo } from '../models/todoModel';

const todos: Todo[] = [
    { id: 524431, title: 'Buy groceries' },
    { id: 2232243, title: 'Finish coding assignment' },
    
];

export const todoService = {
    getTodos: (): Todo[] => todos,

    addTodo: (id:number,title: string): Todo => {
        const newTodo: Todo = { id, title };
        todos.push(newTodo);
        return newTodo;
    },

    deleteTodo: (id: number): void => {
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
        }
    },
};
