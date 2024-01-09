// product.model.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../configs/DbConfig";
// import { User } from "./User";
// import Sales from "./Sales";

interface ProductAttributes {
  product_id: number;
  user_id: number;
  product_name: string;
  product_desc: string;
  product_quantity: number;
  per_product_price: number;
  total_Cost: number;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "product_id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public product_id!: number;
  public user_id!: number;
  public product_name!: string;
  public product_desc!: string;
  public product_quantity!: number;
  public per_product_price!: number;
  public total_Cost!: number;
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    product_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    per_product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_Cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);
// User.hasMany(Product, { foreignKey: "user_id" });
// User.hasMany(Sales, { foreignKey: "user_id" });
export default Product;
