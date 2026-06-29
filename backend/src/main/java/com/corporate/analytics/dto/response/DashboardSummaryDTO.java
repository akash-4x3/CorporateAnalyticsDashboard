package com.corporate.analytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDTO {

    private Long totalEmployees;

    private Long totalDepartments;

    private Long totalRoles;

    private Long totalPerformanceRecords;

    private BigDecimal averagePerformanceScore;

    private BigDecimal totalSales;

}