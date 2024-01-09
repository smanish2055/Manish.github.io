import Sales from "../models/Sales";
import Product from "../models/Product"; // Import your Product model

export const AddSales = async (user_id: number, salesproduct: Sales) => {
  const { product_name, quantity_sold, price_per_item, sale_date } =
    salesproduct;

  try {
    // Assuming there's a foreign key relationship between Sales and Product models
    const product = await Product.findOne({
      where: { product_name: product_name },
    });

    if (product) {
      // Update product quantity based on the sale
      product.product_quantity -= quantity_sold;
      await product.save();
    } else {
      throw new Error("Product not found");
    }

    const newSalesProduct = {
      user_id: user_id,
      product_name: product_name,
      quantity_sold: quantity_sold,
      price_per_item: price_per_item,
      total_sales_price: quantity_sold * price_per_item,
      sale_date: sale_date,
    };

    // Create a new Sale with the combined attributes
    const newSale = await Sales.create(newSalesProduct);
    return newSale;
  } catch (error) {
    console.error("Error adding sales:", error);
    throw error;
  }
};
