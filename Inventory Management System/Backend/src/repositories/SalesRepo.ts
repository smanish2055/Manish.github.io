import Sales from "../models/Sales";
import Product from "../models/Product"; // Import your Product model
import NotFoundError from "../errors/NotFound";
export const AddSales = async (user_id: number, salesproduct: Sales) => {
  const { product_name, quantity_sold, price_per_item, sale_date } =
    salesproduct;

  try {
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
      sales_profit:
        price_per_item * quantity_sold -
        product.per_product_price * quantity_sold,
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

export const getSalesRepo = async (user_id: number) => {
  const getSalesData = await Sales.findAll({
    where: { user_id: user_id },
  });
  if (!getSalesData) {
    throw new NotFoundError(`sales data not found`);
  }
  return getSalesData;
};

export const deleteSalesRepo = async (id: number) => {
  const deletedRowsCount = await Sales.destroy({
    where: { sales_id: id },
  });

  if (deletedRowsCount === 0) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }

  return deletedRowsCount;
};
