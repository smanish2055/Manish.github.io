import ValidationError from "../errors/Validation";
import Product from "../models/Product";

export const AddProductRepo = async (user_id: number, product: Product) => {
  try {
    const { product_name, product_desc, product_quantity, per_product_price } =
      product;

    // Validate if the product_name is unique
    const existingProduct = await Product.findOne({ where: { product_name } });
    if ( existingProduct?.product_name == product_name) {
      throw new ValidationError("Product with the same name already exists");
    } else {
      const newUserAttributes = {
        user_id: user_id,
        product_name: product_name,
        product_desc: product_desc,
        product_quantity: product_quantity,
        per_product_price: per_product_price,
        total_Cost: +product_quantity * +per_product_price,
      };

      // Create a new Product with the combined attributes
      const newProduct = await Product.create(newUserAttributes);
      return newProduct;
    }
  } catch (error) {
    throw error;
  }
};
