import Product from "../models/Product";
import NotFoundError from "../errors/NotFound";

export const getAllProductList = async (user_id: number) => {
  try {
    const allProducts = await Product.findAll({
      where: { user_id: user_id },
      order: [["createdAt", "DESC"]], // Order by product_id in ascending order
    });

    // const commentall = await commen.findAll({
    //   where:{product:}
    // })

    if (!allProducts || allProducts.length === 0) {
      throw new NotFoundError(`Product not found`);
    }

    return allProducts;
  } catch (error) {
    // Handle other errors here
    console.error("Error fetching product list:", error);
    throw error; // Rethrow the error for handling at a higher level if needed
  }
};

export const getProductById = async (id: number) => {
  const product = await Product.findOne({
    where: { product_id: id },
  });

  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }

  return product;
};



export const updateProductById = async (id: number, body: Product) => {
  const { product_name, product_desc, product_quantity, per_product_price } =
    body;
  // await getProductById(id);

  const updatedProduct = await Product.update(
    {
      product_name: product_name,
      product_desc: product_desc,
      product_quantity: +product_quantity,
      per_product_price: +per_product_price,
      total_Cost: product_quantity * per_product_price,
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
