import Product from "../models/Product";
import NotFoundError from "../errors/NotFound";

export const getAllProductList = async (user_id: number) => {
  const allProducts = await Product.findAll({
    where: { user_id: user_id },
  });
  if (!allProducts) {
    throw new NotFoundError(`Product not found`);
  }
  return allProducts;
};

export const getProductById = async (id: number) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
  return product;
};



export const updateProductById = async (id: number, body: Product) => {
  const { product_name, product_desc, product_quantity, per_product_price,total_Cost } =
    body;
  await getProductById(id);
  const updatedProduct = await Product.update(
    {
      product_name: product_name,
      product_desc: product_desc,
      product_quantity: product_quantity,
      per_product_price: per_product_price,
      total_Cost: total_Cost,
    },
    {
      where: { product_id: id }, //key value pairs
    }
  );

  if (!updatedProduct) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }

  return updatedProduct;
};

export const deleteProductById = async (product_id: number) => {
  const deletedRowsCount = await Product.destroy({
    where: { product_id: product_id },
  });

  if (deletedRowsCount === 0) {
    throw new NotFoundError(`Product with id ${product_id} not found`);
  }

  return deletedRowsCount;
};
