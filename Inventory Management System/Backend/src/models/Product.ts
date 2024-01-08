// product.model.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../configs/AuthConfig";
import { User } from "./User";

interface ProductAttributes {
  product_id: number;
  user_id: number;
  product_name: string;
  product_desc: string;
  product_quantity: number;
  product_price: number;
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
  public product_price!: number;

  // Define association with User model
  public static associate(models: any): void {
    Product.belongsTo(User, {
      foreignKey: "user_id", // This should match the field in the Product model
      targetKey: "id", // This is the field in the User model
    });
  }
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
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
