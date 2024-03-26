package com.web.serviceimp;

import com.web.dto.CareerDto;
import com.web.entity.Career;
import com.web.exception.MessageException;
import com.web.repository.CareerRepository;
import com.web.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CareerServiceImp implements CareerService {

    @Autowired
    private CareerRepository careerRepository;

    @Override
    public Career saveOrUpdate(Career career) {
        careerRepository.save(career);
        return career;
    }

    @Override
    public void delete(Long id) {
        careerRepository.deleteById(id);
    }

    @Override
    public Career findById(Long id) {
        Optional<Career> career = careerRepository.findById(id);
        if(career.isEmpty()){
           throw new MessageException("not found career");
        }
        return career.get();
    }

    @Override
    public List<Career> findAll() {
        return careerRepository.findAll();
    }

    @Override
    public List<CareerDto> allCareer() {
        List<Object[]> objs = careerRepository.allCareer();
        List<CareerDto> list = new ArrayList<>();
        for(Object[] o : objs){
            CareerDto career = new CareerDto();
            career.setId((BigDecimal) o[0]);
            career.setName((String) o[1]);
            career.setQuantity((Integer) o[2]);
            list.add(career);
        }
        return list;
    }
}
