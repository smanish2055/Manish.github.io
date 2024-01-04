
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