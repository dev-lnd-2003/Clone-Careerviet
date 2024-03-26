package com.web.service;

import com.web.entity.Salary;
import com.web.entity.Welfare;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WelfareService {

    public Welfare saveOrUpdate(Welfare welfare);

    public void delete(Long id);

    public Welfare findById(Long id);

    public List<Welfare> findAll();
}
