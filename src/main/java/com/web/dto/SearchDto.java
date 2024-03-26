package com.web.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SearchDto {

    private String search;

    private Long provinceId;

    private Long salaryId;

    private Integer page;

    private Integer size;

    private List<Long> careerId = new ArrayList<>();
}
