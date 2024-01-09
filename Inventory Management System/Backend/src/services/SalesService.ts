import NotFoundError from "../errors/NotFound";
import Sales from "../models/Sales";
import * as salesRepo from "../repositories/SalesRepo";

export const AddSales = async (user_id: number, salesproduct: Sales) => {
  const salesData = await salesRepo.AddSales(user_id, salesproduct);
  if (!salesData) throw new NotFoundError(`sales product not found`);
  return salesData;
};
