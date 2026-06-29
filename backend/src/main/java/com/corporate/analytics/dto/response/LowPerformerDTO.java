package com.corporate.analytics.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LowPerformerDTO {

    private Integer userId;

    private String employeeName;

    private String departmentName;

    private BigDecimal performanceScore;

}