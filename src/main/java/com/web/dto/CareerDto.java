package com.web.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CareerDto {

    private BigDecimal id;

    private String name;

    private Integer quantity;
}
