

// const todos: Todo[] = [
//   { id: 524431, title: "Buy groceries" },
//   { id: 2232243, title: "Finish coding assignment" },
// ];

// export const todoService = {
//   getTodos: (): Todo[] => todos,

//   addTodo: (id: number, title: string): Todo => {
//     const newTodo: Todo = { id, title };
//     todos.push(newTodo);
//     return newTodo;
//   },

//   updateTodo: (id: number, title: string): Todo | null => {
//     const todoToUpdateIndex = todos.findIndex((todo) => todo.id === id);

//     if (todoToUpdateIndex !== -1) {
//       todos[todoToUpdateIndex] = {
//         id,
//         title,
//       };

//       return todos[todoToUpdateIndex];
//     } else {
//       return null;
//     }
//   },

//   deleteTodo: (id: number): void => {
//     const index = todos.findIndex((todo) => todo.id === id);
//     if (index !== -1) {
//       todos.splice(index, 1);
//     }
//   },
// };




import { Todo } from "../models/todoModel";
import BaseModel from "../models/baseModel";

export default class TodoModel extends BaseModel {
  static async getTodos() {
    return this.queryBuilder().select({
      id: "id",
      title: "title",
    });
  }


  static async addTodo(todo: Todo) {
    return this.queryBuilder().insert(todo).table("todos");
  }

  static async updateTodo(id: number, todo: Todo) {
    return this.queryBuilder().update(todo ).table("todos").where({ id });
  }

  static async deleteTodo(id: number) {
    return this.queryBuilder().table("todos").where({ id }).del();
  }

 
}