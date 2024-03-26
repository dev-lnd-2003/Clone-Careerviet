package com.web.serviceimp;

import com.web.entity.Salary;
import com.web.exception.MessageException;
import com.web.repository.SalaryRepository;
import com.web.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SalaryServiceImp implements SalaryService {

    @Autowired
    private SalaryRepository salaryRepository;

    @Override
    public Salary saveOrUpdate(Salary salary) {
        Salary result = salaryRepository.save(salary);
        return result;
    }

    @Override
    public void delete(Long id) {
        try {
            salaryRepository.deleteById(id);
        }
        catch (Exception e){
            throw new MessageException("Không thể xóa mức lương này");
        }
    }

    @Override
    public Salary findById(Long id) {
        return salaryRepository.findById(id).get();
    }

    @Override
    public List<Salary> findAll() {
        return salaryRepository.findAll();
    }
}
