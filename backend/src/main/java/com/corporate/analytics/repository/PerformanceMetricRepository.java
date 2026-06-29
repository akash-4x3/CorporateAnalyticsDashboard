package com.corporate.analytics.repository;

import com.corporate.analytics.entity.PerformanceMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import com.corporate.analytics.dto.response.SalesSummaryDTO;
import org.springframework.data.repository.query.Param;
import com.corporate.analytics.dto.response.LowPerformerDTO;
import com.corporate.analytics.dto.response.PerformanceTrendDTO;
import org.springframework.data.domain.Pageable;
import com.corporate.analytics.dto.response.DepartmentPerformanceDTO;
public interface PerformanceMetricRepository extends JpaRepository<PerformanceMetric, Integer> {

    List<PerformanceMetric> findByUserUserId(Integer userId);
    @Query("SELECT AVG(p.performanceScore) FROM PerformanceMetric p")
    Double findAveragePerformanceScore();

    @Query("SELECT SUM(p.salesAmount) FROM PerformanceMetric p")
    java.math.BigDecimal findTotalSales();

    List<PerformanceMetric> findAllByOrderByPerformanceScoreDesc(Pageable pageable);

    @Query("""
        SELECT new com.corporate.analytics.dto.response.DepartmentPerformanceDTO(
            p.user.department.departmentName,
            AVG(p.performanceScore)
        )
        FROM PerformanceMetric p
        GROUP BY p.user.department.departmentName
        ORDER BY AVG(p.performanceScore) DESC
        """)
    List<DepartmentPerformanceDTO> findDepartmentPerformance();

    @Query("""
        SELECT new com.corporate.analytics.dto.response.PerformanceTrendDTO(
            p.reviewPeriod,
            AVG(p.performanceScore)
        )
        FROM PerformanceMetric p
        GROUP BY p.reviewPeriod
        ORDER BY p.reviewPeriod
        """)
    List<PerformanceTrendDTO> findPerformanceTrend();

    @Query("""
        SELECT new com.corporate.analytics.dto.response.LowPerformerDTO(
            p.user.userId,
            p.user.fullName,
            p.user.department.departmentName,
            p.performanceScore
        )
        FROM PerformanceMetric p
        WHERE p.performanceScore < :threshold
        ORDER BY p.performanceScore ASC
        """)
    List<LowPerformerDTO> findLowPerformers(@Param("threshold") BigDecimal threshold);

    @Query("""
        SELECT new com.corporate.analytics.dto.response.SalesSummaryDTO(
            SUM(p.salesAmount),
            AVG(p.salesAmount),
            MAX(p.salesAmount),
            MIN(p.salesAmount)
        )
        FROM PerformanceMetric p
        """)
    SalesSummaryDTO getSalesSummary();

}





