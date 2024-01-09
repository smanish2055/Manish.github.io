import Product from "../models/Product";
import NotFoundError from "../errors/NotFound";

export const getDashboardData = async (user_id: number) => {
  const allProducts = await Product.findAll({
    where: { user_id: user_id },
  });
  if (!allProducts) throw new NotFoundError(`User ${user_id} not found`);
  return allProducts;
};
