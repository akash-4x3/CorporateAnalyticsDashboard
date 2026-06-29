package com.corporate.analytics.mapper;

import com.corporate.analytics.dto.response.PerformanceMetricResponseDTO;
import com.corporate.analytics.entity.PerformanceMetric;

public class PerformanceMetricMapper {

    public static PerformanceMetricResponseDTO toDTO(PerformanceMetric metric) {

        return new PerformanceMetricResponseDTO(
                metric.getMetricId(),
                metric.getUser().getUserId(),
                metric.getUser().getFullName(),
                metric.getReviewPeriod(),
                metric.getSalesAmount(),
                metric.getTasksCompleted(),
                metric.getCustomerSatisfaction(),
                metric.getPerformanceScore()
        );
    }
}