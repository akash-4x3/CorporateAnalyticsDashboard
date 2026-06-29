package com.corporate.analytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesSummaryDTO {

    private BigDecimal totalSales;

    private Double averageSales;

    private BigDecimal highestSales;

    private BigDecimal lowestSales;

}