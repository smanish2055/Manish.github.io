// sales.model.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../configs/DbConfig";

interface SalesAttributes {
  sales_id: number;
  user_id: number;
  product_name: string;
  quantity_sold: number;
  price_per_item: number;
  total_sales_price: number;
  sale_date: Date;
}

interface SalesCreationAttributes
  extends Optional<SalesAttributes, "sales_id"> {}

class Sales
  extends Model<SalesAttributes, SalesCreationAttributes>
  implements SalesAttributes
{
  public sales_id!: number;
  public user_id!: number;
  public product_name!: string;
  public quantity_sold!: number;
  public price_per_item!: number;
  public total_sales_price!: number;
  public sale_date!: Date;
}

Sales.init(
  {
    sales_id: {
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
    },
    quantity_sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_item: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_sales_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sales",
    createdAt: "Created_Date",
    updatedAt: false,
  }
);

export default Sales;
