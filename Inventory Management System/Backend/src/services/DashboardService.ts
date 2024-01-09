import NotFoundError from "../errors/NotFound";
import * as dashboardRepo from "../repositories/DashboardRepo";

export const dashboardService = async (user_id: number) => {
  const dashboardData:any = await dashboardRepo.getDashboardData(user_id);
  if (!dashboardData) throw new NotFoundError(`data not found`);
  return dashboardData;
};
