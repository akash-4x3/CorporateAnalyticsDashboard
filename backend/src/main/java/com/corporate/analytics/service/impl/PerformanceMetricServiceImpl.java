package com.corporate.analytics.service.impl;

import com.corporate.analytics.dto.response.PerformanceMetricResponseDTO;
import com.corporate.analytics.mapper.PerformanceMetricMapper;
import com.corporate.analytics.repository.PerformanceMetricRepository;
import com.corporate.analytics.service.PerformanceMetricService;
import org.springframework.stereotype.Service;
import com.corporate.analytics.dto.request.CreatePerformanceMetricRequest;
import com.corporate.analytics.entity.PerformanceMetric;
import com.corporate.analytics.entity.User;
import com.corporate.analytics.exception.ResourceNotFoundException;
import com.corporate.analytics.repository.UserRepository;
import java.util.List;
import com.corporate.analytics.dto.request.UpdatePerformanceMetricRequest;
@Service
public class PerformanceMetricServiceImpl implements PerformanceMetricService {

    private final PerformanceMetricRepository performanceMetricRepository;
    private final UserRepository userRepository;

    public PerformanceMetricServiceImpl(PerformanceMetricRepository performanceMetricRepository, UserRepository userRepository) {
        this.performanceMetricRepository = performanceMetricRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<PerformanceMetricResponseDTO> getAllPerformanceMetrics() {

        return performanceMetricRepository.findAll()
                .stream()
                .map(PerformanceMetricMapper::toDTO)
                .toList();
    }

    @Override
    public PerformanceMetricResponseDTO createPerformanceMetric(CreatePerformanceMetricRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        PerformanceMetric metric = new PerformanceMetric();

        metric.setUser(user);
        metric.setReviewPeriod(request.getReviewPeriod());
        metric.setSalesAmount(request.getSalesAmount());
        metric.setTasksCompleted(request.getTasksCompleted());
        metric.setCustomerSatisfaction(request.getCustomerSatisfaction());
        metric.setPerformanceScore(request.getPerformanceScore());

        PerformanceMetric savedMetric = performanceMetricRepository.save(metric);

        return PerformanceMetricMapper.toDTO(savedMetric);
    }
    @Override
    public PerformanceMetricResponseDTO getPerformanceMetricById(Integer id) {

        PerformanceMetric metric = performanceMetricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Performance metric not found"));

        return PerformanceMetricMapper.toDTO(metric);
    }

    @Override
    public PerformanceMetricResponseDTO updatePerformanceMetric(
            Integer id,
            UpdatePerformanceMetricRequest request) {

        PerformanceMetric metric = performanceMetricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Performance metric not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        metric.setUser(user);
        metric.setReviewPeriod(request.getReviewPeriod());
        metric.setSalesAmount(request.getSalesAmount());
        metric.setTasksCompleted(request.getTasksCompleted());
        metric.setCustomerSatisfaction(request.getCustomerSatisfaction());
        metric.setPerformanceScore(request.getPerformanceScore());

        PerformanceMetric updatedMetric = performanceMetricRepository.save(metric);

        return PerformanceMetricMapper.toDTO(updatedMetric);
    }
    @Override
    public void deletePerformanceMetric(Integer id) {

        PerformanceMetric metric = performanceMetricRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Performance metric not found"));

        performanceMetricRepository.delete(metric);
    }
}