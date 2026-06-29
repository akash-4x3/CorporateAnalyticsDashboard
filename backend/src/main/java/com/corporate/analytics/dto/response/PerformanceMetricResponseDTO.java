package com.corporate.analytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceMetricResponseDTO {

    private Integer metricId;

    private Integer userId;

    private String employeeName;

    private String reviewPeriod;

    private BigDecimal salesAmount;

    private Integer tasksCompleted;

    private BigDecimal customerSatisfaction;

    private BigDecimal performanceScore;

}