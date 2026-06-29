package com.corporate.analytics.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePerformanceMetricRequest {

    private Integer userId;

    private String reviewPeriod;

    private BigDecimal salesAmount;

    private Integer tasksCompleted;

    private BigDecimal customerSatisfaction;

    private BigDecimal performanceScore;
}