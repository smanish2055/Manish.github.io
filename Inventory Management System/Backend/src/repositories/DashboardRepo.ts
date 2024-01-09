import Product from "../models/Product";
import { User } from "../models/User";
import Sales from "../models/Sales";
import NotFoundError from "../errors/NotFound";
import { Sequelize } from "sequelize";

export const getDashboardData = async (id: number) => {
  const userName = await User.findOne({ where: { id: id } });
  const productCount = await Product.count({
    where: { user_id: id },
  });
  const productSold = await Sales.count({ where: { user_id: id } });
     const topProducts = await Sales.findAll({
       attributes: [
         "product_name",
         [
           Sequelize.fn("SUM", Sequelize.literal("sales_profit")),
           "top_product_profit",
         ],
       ],
       group: ["product_name"],
       order: [[Sequelize.literal("top_product_profit"), "DESC"]],
       limit: 5,
     });
  
  const dashboardData = {
    username: userName?.username,
    productCount: productCount,
    productSoldCount: productSold,
    topProducts: topProducts,
  };

  return dashboardData;
}
