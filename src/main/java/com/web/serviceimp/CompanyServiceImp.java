package com.web.serviceimp;

import com.web.dto.CompanyResponse;
import com.web.entity.Company;
import com.web.entity.User;
import com.web.repository.CompanyRepository;
import com.web.service.CompanyService;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CompanyServiceImp implements CompanyService {

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public CompanyResponse findByUser() {
        User user = userUtils.getUserWithAuthority();
        Company company = companyRepository.findByUser(user.getId());
        CompanyResponse result = new CompanyResponse();
        result.setCompany(company);
        result.setUser(user);
        return result;
    }

    @Override
    public CompanyResponse update(Company company) {
        User user = userUtils.getUserWithAuthority();
        company.setUser(user);
        Company cm = companyRepository.save(company);
        CompanyResponse result = new CompanyResponse();
        result.setCompany(cm);
        result.setUser(user);
        return result;
    }

    @Override
    public List<Company> findAll() {
        List<Company> list = companyRepository.findAll();
        return list;
    }

    @Override
    public List<Company> topCompany() {
        return companyRepository.topCompany();
    }
}
