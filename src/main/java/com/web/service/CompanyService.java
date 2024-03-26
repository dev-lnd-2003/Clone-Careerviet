package com.web.service;

import com.web.dto.CompanyResponse;
import com.web.entity.Company;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CompanyService {

    public CompanyResponse findByUser();

    public CompanyResponse update(Company company);

    public List<Company> findAll();

    public List<Company> topCompany();

}
