package com.corporate.analytics.controller;

import com.corporate.analytics.dto.response.PerformanceMetricResponseDTO;
import com.corporate.analytics.payload.ApiResponse;
import com.corporate.analytics.service.PerformanceMetricService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.corporate.analytics.dto.request.CreatePerformanceMetricRequest;
import java.util.List;
import com.corporate.analytics.dto.request.UpdatePerformanceMetricRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/performance-metrics")
public class PerformanceMetricController {

    private final PerformanceMetricService performanceMetricService;

    public PerformanceMetricController(PerformanceMetricService performanceMetricService) {
        this.performanceMetricService = performanceMetricService;
    }

    @GetMapping
    public ApiResponse<List<PerformanceMetricResponseDTO>> getAllPerformanceMetrics() {

        return new ApiResponse<>(
                true,
                "Performance metrics fetched successfully",
                performanceMetricService.getAllPerformanceMetrics()
        );
    }
    @PostMapping
    public ApiResponse<PerformanceMetricResponseDTO> createPerformanceMetric(
            @RequestBody CreatePerformanceMetricRequest request) {

        return new ApiResponse<>(
                true,
                "Performance metric created successfully",
                performanceMetricService.createPerformanceMetric(request)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<PerformanceMetricResponseDTO> updatePerformanceMetric(
            @PathVariable Integer id,
            @RequestBody UpdatePerformanceMetricRequest request) {

        return new ApiResponse<>(
                true,
                "Performance metric updated successfully",
                performanceMetricService.updatePerformanceMetric(id, request)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<PerformanceMetricResponseDTO> getPerformanceMetricById(
            @PathVariable Integer id) {

        return new ApiResponse<>(
                true,
                "Performance metric fetched successfully",
                performanceMetricService.getPerformanceMetricById(id)
        );
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deletePerformanceMetric(@PathVariable Integer id) {

        performanceMetricService.deletePerformanceMetric(id);

        return new ApiResponse<>(
                true,
                "Performance metric deleted successfully",
                null
        );
    }
}