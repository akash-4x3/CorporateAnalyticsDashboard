package com.corporate.analytics.service;

import com.corporate.analytics.dto.response.DashboardSummaryDTO;
import com.corporate.analytics.dto.response.TopPerformerDTO;
import java.util.List;
import com.corporate.analytics.dto.response.LowPerformerDTO;
import java.math.BigDecimal;
import com.corporate.analytics.dto.response.SalesSummaryDTO;
import com.corporate.analytics.dto.response.PerformanceTrendDTO;
import com.corporate.analytics.dto.response.DepartmentPerformanceDTO;
public interface DashboardService {

    DashboardSummaryDTO getDashboardSummary();
    List<TopPerformerDTO> getTopPerformers();
    List<PerformanceTrendDTO> getPerformanceTrend();
    List<DepartmentPerformanceDTO> getDepartmentPerformance();
    List<LowPerformerDTO> getLowPerformers(BigDecimal threshold);
    SalesSummaryDTO getSalesSummary();
}