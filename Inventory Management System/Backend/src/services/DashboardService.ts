import NotFoundError from "../errors/NotFound";
import Product from "../models/Product";
import * as getDashboardData from "../repositories/DashboardRepo";

export const dashboardService = async (user_id: number) => {
  const allProducts = await getDashboardData.getDashboardData(user_id);
  if (!allProducts) throw new NotFoundError(`product not found`);
  return allProducts;
};
