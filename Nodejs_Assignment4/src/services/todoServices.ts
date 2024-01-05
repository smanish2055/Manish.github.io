import { Todo } from "../models/todoModel"; 
// import { TodoSql } from "../models/todosModel";
import BaseModel from "../models/baseModel";

export default class TodoModel extends BaseModel {
  static async getTodos() {
    return this.queryBuilder().select({
      id: "id",
      title: "title",
      completed: "completed",
    });
  }

  static async addTodo(todo: Todo) {
    return this.queryBuilder().insert(todo).table("todosCompleted");
  }

  static async getByPagination(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
      })
      .limit(limit)
      .offset(offset);
  }

  static async updateTodo(id: number, todo: Todo) {
    return this.queryBuilder()
      .update(todo)
      .table("todosCompleted")
      .where({ id });
  }

  static async deleteTodo(id: number) {
    return this.queryBuilder().table("todosCompleted").where({ id }).del();
  }
}


// export class TodoService {
//   // static async syncDatabase() {
//   //   try {
//   //     await TodoSql.sync({ force: true });
//   //     console.log("Table and model synced successfully");
//   //   } catch (error: any) {
//   //     console.error("Error syncing model:", error.message);
//   //     throw error;
//   //   }
//   // }

//   static async insertTodo(data: {
//     title: string;
//     description: string;
//     completed: boolean;
//   }) {
//     try {
//       const createdTodo = await TodoSql.create(data);
//       console.log("Data inserted successfully:", createdTodo.toJSON());
//       return createdTodo.toJSON();
//     } catch (error: any) {
//       console.error("Error inserting data:", error.message);
//       throw error;
//     }
//   }
// }
