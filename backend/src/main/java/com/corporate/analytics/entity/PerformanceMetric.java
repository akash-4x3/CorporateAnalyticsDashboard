package com.corporate.analytics.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "performance_metrics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metric_id")
    private Integer metricId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "review_period")
    private String reviewPeriod;

    @Column(name = "sales_amount")
    private BigDecimal salesAmount;

    @Column(name = "tasks_completed")
    private Integer tasksCompleted;

    @Column(name = "customer_satisfaction")
    private BigDecimal customerSatisfaction;

    @Column(name = "performance_score")
    private BigDecimal performanceScore;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}