package com.corporate.analytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentPerformanceDTO {

    private String departmentName;

    private Double averagePerformanceScore;

}