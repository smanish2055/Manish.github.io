import NotFoundError from "../errors/NotFound";
import Product from "../models/Product";
import * as userRepo from "../repositories/ProductListRepo";

export const getAllProductList = async (user_id: number) => {
  const allProducts = await userRepo.getAllProductList(user_id);
  if (!allProducts) throw new NotFoundError(`product not found`);
  return allProducts;
};

export const getProductById = async (id: number) => {
  const product = await userRepo.getProductById(id);
  if (!product)
    throw new NotFoundError(`product with product id : ${id} not found`);
  return product;
};

export const updateProductById = async (id: number, body: Product) => {
  const updatedProduct = await userRepo.updateProductById(id, body);
  if (!updatedProduct)
    throw new NotFoundError(`updatedProduct with product id : ${id} not found`);
  return updatedProduct;
};

export const deleteProductById = async (id: number) => {
  const deletedProduct = await userRepo.deleteProductById(id);
  if (!deletedProduct) throw new NotFoundError("deletedProduct not found");
  return deletedProduct;
};
