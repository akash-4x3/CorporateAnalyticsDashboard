import api from "./api";

export const getAllPerformanceMetrics = async () => {

    const response = await api.get("/performance-metrics");

    return response.data;
};

export const createPerformanceMetric = async (performanceData) => {

    const response = await api.post(
        "/performance-metrics",
        performanceData
    );

    return response.data;

};

export const updatePerformanceMetric = async (metricId, performanceData) => {

    const response = await api.put(
        `/performance-metrics/${metricId}`,
        performanceData
    );

    return response.data;

};

export const deletePerformanceMetric = async (metricId) => {

    const response = await api.delete(`/performance-metrics/${metricId}`);

    return response.data;

};
