package com.web.service;

import com.web.entity.Career;
import com.web.entity.Salary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SalaryService {

    public Salary saveOrUpdate(Salary salary);

    public void delete(Long id);

    public Salary findById(Long id);

    public List<Salary> findAll();
}
