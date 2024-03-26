package com.web.service;

import com.web.entity.JobApplication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JobApplicationService {

    public List<JobApplication> findByJob(Long jobId);

    public List<JobApplication> findByJobAndUser(Long jobId);

    public List<JobApplication> findByUser();

    public void save(JobApplication jobApplication);

    public void delete(Long id);

    public JobApplication findById(Long id);

}
