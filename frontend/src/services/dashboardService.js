import api from "./api";

export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard/summary");
  return response.data;
};

export const getTopPerformers = async () => {
  const response = await api.get("/dashboard/top-performers");
  return response.data;
};

export const getPerformanceTrend = async () => {
  const response = await api.get("/dashboard/performance-trend");
  return response.data;
};

export const getLowPerformers = async () => {
  const response = await api.get("/dashboard/low-performers");
  return response.data;
};