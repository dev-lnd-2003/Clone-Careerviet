package com.web.dto;

import com.web.entity.Company;
import com.web.entity.User;
import lombok.Data;

@Data
public class CompanyResponse {

    private Company company;

    private User user;
}
