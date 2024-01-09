// user.model.ts
import { Model, DataTypes, Optional } from "sequelize";
import { randomUUID } from "crypto";
import sequelize from "../configs/DbConfig";
import Product from "./Product";
import Sales from "./Sales";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken?: string | null;
  reset_code?: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public refreshToken?: string | null;
  public reset_code?: string | null;

  // Timestamps
  public readonly Created_Date!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    // reset_code: {
    //   type: DataTypes.STRING,
    //   defaultValue: randomUUID(),
    // },
  },
  {
    sequelize,
    tableName: "users",
    createdAt: "Created_Date",
    updatedAt: false,
  }
);

export { User, Product, Sales };
