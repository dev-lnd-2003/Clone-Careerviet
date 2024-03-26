package com.web.service;

import com.web.dto.CareerDto;
import com.web.entity.Blog;
import com.web.entity.Career;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CareerService {

    public Career saveOrUpdate(Career career);

    public void delete(Long id);

    public Career findById(Long id);

    public List<Career> findAll();

    public List<CareerDto> allCareer();
}
