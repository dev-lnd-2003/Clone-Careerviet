package com.web.dto;

import com.web.entity.Career;
import com.web.entity.Job;
import com.web.entity.Welfare;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class JobDto {

    private Job job;

    private List<Career> careers = new ArrayList<>();

    private List<Welfare> welfare = new ArrayList<>();

}
