import NotFoundError from "../errors/NotFound";
import Sales from "../models/Sales";
import * as salesRepo from "../repositories/SalesRepo";

export const AddSales = async (user_id: number, salesproduct: Sales) => {
  const salesData = await salesRepo.AddSales(user_id, salesproduct);
  if (!salesData) throw new NotFoundError(`sales product not found`);
  return salesData;
};


export const getSalesService = async (user_id: number) => {
  const salesData = await salesRepo.getSalesRepo(user_id);
  if (!salesData) throw new NotFoundError(`sales product not found`);
  return salesData;
};

export const deleteSalesService = async (id: number) => {
  const deleteData = await salesRepo.deleteSalesRepo(id);
  if (!deleteData) throw new NotFoundError(`sales product not found`);
  return deleteData;
};

