package com.corporate.analytics.service;

import com.corporate.analytics.dto.response.PerformanceMetricResponseDTO;
import com.corporate.analytics.dto.request.CreatePerformanceMetricRequest;
import java.util.List;
import com.corporate.analytics.dto.request.UpdatePerformanceMetricRequest;

public interface PerformanceMetricService {

    List<PerformanceMetricResponseDTO> getAllPerformanceMetrics();
    PerformanceMetricResponseDTO createPerformanceMetric(CreatePerformanceMetricRequest request);
    PerformanceMetricResponseDTO getPerformanceMetricById(Integer id);
    PerformanceMetricResponseDTO updatePerformanceMetric(
            Integer id,
            UpdatePerformanceMetricRequest request
    );
    void deletePerformanceMetric(Integer id);
}
