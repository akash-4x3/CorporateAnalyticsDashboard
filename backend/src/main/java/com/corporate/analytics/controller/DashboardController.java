package com.corporate.analytics.controller;

import com.corporate.analytics.dto.response.DashboardSummaryDTO;
import com.corporate.analytics.payload.ApiResponse;
import com.corporate.analytics.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.corporate.analytics.dto.response.TopPerformerDTO;
import java.util.List;
import com.corporate.analytics.dto.response.LowPerformerDTO;
import org.springframework.web.bind.annotation.RequestParam;
import java.math.BigDecimal;
import com.corporate.analytics.dto.response.PerformanceTrendDTO;
import com.corporate.analytics.dto.response.DepartmentPerformanceDTO;
import com.corporate.analytics.dto.response.SalesSummaryDTO;
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ApiResponse<DashboardSummaryDTO> getDashboardSummary() {

        return new ApiResponse<>(
                true,
                "Dashboard summary fetched successfully",
                dashboardService.getDashboardSummary()
        );
    }

    @GetMapping("/top-performers")
    public ApiResponse<List<TopPerformerDTO>> getTopPerformers() {

        return new ApiResponse<>(
                true,
                "Top performers fetched successfully",
                dashboardService.getTopPerformers()
        );
    }

    @GetMapping("/department-performance")
    public ApiResponse<List<DepartmentPerformanceDTO>> getDepartmentPerformance() {

        return new ApiResponse<>(
                true,
                "Department performance fetched successfully",
                dashboardService.getDepartmentPerformance()
        );
    }

    @GetMapping("/performance-trend")
    public ApiResponse<List<PerformanceTrendDTO>> getPerformanceTrend() {

        return new ApiResponse<>(
                true,
                "Performance trend fetched successfully",
                dashboardService.getPerformanceTrend()
        );
    }

    @GetMapping("/low-performers")
    public ApiResponse<List<LowPerformerDTO>> getLowPerformers(
            @RequestParam(defaultValue = "70") BigDecimal threshold) {

        return new ApiResponse<>(
                true,
                "Low performers fetched successfully",
                dashboardService.getLowPerformers(threshold)
        );
    }

    @GetMapping("/sales-summary")
    public ApiResponse<SalesSummaryDTO> getSalesSummary() {

        return new ApiResponse<>(
                true,
                "Sales summary fetched successfully",
                dashboardService.getSalesSummary()
        );
    }
}