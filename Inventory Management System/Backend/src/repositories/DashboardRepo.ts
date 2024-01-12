import Product from "../models/Product";
import { User } from "../models/User";
import Sales from "../models/Sales";
import { Sequelize } from "sequelize";

export const getDashboardData = async (id: number) => {
  try {
    const userName = await User.findOne({ where: { id: id } });
    const productCount = await Product.count({
      where: { user_id: id },
    });
    const productSold = await Sales.count({ where: { user_id: id } });

    const result = await Sales.findOne({
      where: { user_id: id },
      attributes: [
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.literal("sales_profit")),
            0
          ),
          "total_profit",
        ],
      ],
    });
    const totalProfit = result ? result.get("total_profit") : 0;

    const topProducts = await Sales.findAll({
      where: { user_id: id },
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


     const topQuantitySold = await Sales.findAll({
       where: { user_id: id },
       attributes: [
         "product_name",
         [
           Sequelize.fn("SUM", Sequelize.literal("quantity_sold")),
           "quantitySold",
         ],
       ],
       group: ["product_name"],
       order: [[Sequelize.literal("quantitySold"), "DESC"]],
       limit: 5,
     });
    
  

    const dashboardData = {
      username: userName?.username,
      productCount: productCount,
      productSoldCount: productSold,
      totalProfit: totalProfit,
      topProducts: topProducts,
      topQuantitySold: topQuantitySold,
    };

    return dashboardData;
  } catch (error) {
    throw error;
  }
};
