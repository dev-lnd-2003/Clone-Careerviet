package com.web.service;

import com.web.dto.JobDto;
import com.web.dto.SearchDto;
import com.web.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public interface JobService {

    public Job saveOrUpdate(JobDto jobDto);

    public List<Job> findByUser(String sttName);

    public List<Job> findAll();

    public Job findById(Long id);

    public void delete(Long id);

    public void updateStatusJob(Long id, String sttName);

    public List<Job> findAllByAdmin(String sttName, Date from, Date to);

    public Page<Job> findAll(Pageable pageable);

    public Page<Job> searchAll(SearchDto dto, Pageable pageable);

    public List<Job> relateJob(Long id);

    public List<Job> getTopJob();
}
