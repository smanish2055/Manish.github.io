import Product from "../models/Product";

export const AddProductRepo = async (user_id: number, product: Product) => {
  const { product_name, product_desc, product_quantity, per_product_price } =
    product;
  const newUserAttributes = {
    user_id: user_id,
    product_name: product_name,
    product_desc: product_desc,
    product_quantity: product_quantity,
    per_product_price: per_product_price,
    total_Cost: +product_quantity * +per_product_price,

    // Set user_id from res.locals.user
  };

  // Create a new User with the combined attributes
  const newUser = await Product.create(newUserAttributes);
  return newUser;
};
