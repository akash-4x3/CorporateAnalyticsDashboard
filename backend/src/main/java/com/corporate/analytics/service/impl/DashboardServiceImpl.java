package com.corporate.analytics.service.impl;

import com.corporate.analytics.dto.response.DashboardSummaryDTO;
import com.corporate.analytics.repository.DepartmentRepository;
import com.corporate.analytics.repository.PerformanceMetricRepository;
import com.corporate.analytics.repository.RoleRepository;
import com.corporate.analytics.repository.UserRepository;
import com.corporate.analytics.service.DashboardService;
import org.springframework.stereotype.Service;
import com.corporate.analytics.dto.response.TopPerformerDTO;
import org.springframework.data.domain.PageRequest;
import java.util.List;
import com.corporate.analytics.dto.response.SalesSummaryDTO;
import com.corporate.analytics.dto.response.LowPerformerDTO;
import java.math.BigDecimal;
import com.corporate.analytics.dto.response.PerformanceTrendDTO;
import com.corporate.analytics.dto.response.DepartmentPerformanceDTO;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;
    private final PerformanceMetricRepository performanceMetricRepository;

    public DashboardServiceImpl(
            UserRepository userRepository,
            DepartmentRepository departmentRepository,
            RoleRepository roleRepository,
            PerformanceMetricRepository performanceMetricRepository) {

        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
        this.performanceMetricRepository = performanceMetricRepository;
    }

    @Override
    public DashboardSummaryDTO getDashboardSummary() {

        Long totalEmployees = userRepository.count();
        Long totalDepartments = departmentRepository.count();
        Long totalRoles = roleRepository.count();
        Long totalPerformanceRecords = performanceMetricRepository.count();

        Double averageScore = performanceMetricRepository.findAveragePerformanceScore();
        BigDecimal totalSales = performanceMetricRepository.findTotalSales();

        return new DashboardSummaryDTO(
                totalEmployees,
                totalDepartments,
                totalRoles,
                totalPerformanceRecords,
                averageScore == null ? BigDecimal.ZERO : BigDecimal.valueOf(averageScore),
                totalSales == null ? BigDecimal.ZERO : totalSales
        );
    }

    @Override
    public List<TopPerformerDTO> getTopPerformers() {

        return performanceMetricRepository
                .findAllByOrderByPerformanceScoreDesc(PageRequest.of(0, 5))
                .stream()
                .map(metric -> new TopPerformerDTO(
                        metric.getUser().getUserId(),
                        metric.getUser().getFullName(),
                        metric.getUser().getDepartment().getDepartmentName(),
                        metric.getPerformanceScore(),
                        metric.getSalesAmount()
                ))
                .toList();
    }

    @Override
    public List<DepartmentPerformanceDTO> getDepartmentPerformance() {

        return performanceMetricRepository.findDepartmentPerformance();
    }

    @Override
    public List<PerformanceTrendDTO> getPerformanceTrend() {

        return performanceMetricRepository.findPerformanceTrend();
    }

    @Override
    public List<LowPerformerDTO> getLowPerformers(BigDecimal threshold) {

        return performanceMetricRepository.findLowPerformers(threshold);
    }

    @Override
    public SalesSummaryDTO getSalesSummary() {

        return performanceMetricRepository.getSalesSummary();
    }
}