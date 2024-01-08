import NotFoundError from "../errors/NotFound";
import Product from "../models/Product";
import * as productRepo from "../repositories/AddProductsRepo";

export const AddProductService = async (user_id:number,data: Product) => {
  const product = await productRepo.AddProductRepo(user_id,data);
  if (!product) throw new NotFoundError("product not found");
};
