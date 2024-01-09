import NotFoundError from "../errors/NotFound";
import Product from "../models/Product";
import * as addProductRepo from "../repositories/AddProductsRepo";

export const AddProductService = async (user_id: number, data: Product) => {
  try {
    const product = await addProductRepo.AddProductRepo(user_id, data);
    if (!product) throw new NotFoundError("product not found");
  } catch (error) {
    throw error;
  }
};
