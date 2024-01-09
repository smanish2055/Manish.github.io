import NotFoundError from "../errors/NotFound";
import Product from "../models/Product";
import * as productListRepo from "../repositories/ProductListRepo";

export const getAllProductList = async (user_id: number) => {
  const allProducts = await productListRepo.getAllProductList(user_id);
  if (!allProducts) throw new NotFoundError(`product not found`);
  return allProducts;
};

export const getProductById = async (id: number) => {
  const product = await productListRepo.getProductById(id);
  if (!product)
    throw new NotFoundError(`product with product id : ${id} not found`);
  return product;
};

export const updateProductById = async (id: number, body: Product) => {
  const updatedProduct = await productListRepo.updateProductById(id, body);
  if (!updatedProduct)
    throw new NotFoundError(`updatedProduct with product id : ${id} not found`);
  return updatedProduct;
};

export const deleteProductById = async (id: number) => {
  const deletedProduct = await productListRepo.deleteProductById(id);
  if (!deletedProduct) throw new NotFoundError("deletedProduct not found");
  return deletedProduct;
};
