package com.web.serviceimp;

import com.web.entity.JobApplication;
import com.web.exception.MessageException;
import com.web.repository.JobApplicationRepository;
import com.web.service.JobApplicationService;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public class JobApplicationServiceImp implements JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserUtils userUtils;

    @Override
    public List<JobApplication> findByJob(Long jobId) {
        return jobApplicationRepository.findByJob(jobId);
    }

    @Override
    public List<JobApplication> findByJobAndUser(Long jobId) {
        return jobApplicationRepository.findByJobAndUser(jobId, userUtils.getUserWithAuthority().getId());
    }

    @Override
    public List<JobApplication> findByUser() {
        return jobApplicationRepository.findByUser(userUtils.getUserWithAuthority().getId());
    }

    @Override
    public void save(JobApplication jobApplication) {
        List<JobApplication> list = jobApplicationRepository.findByJobAndUser(jobApplication.getJob().getId(), userUtils.getUserWithAuthority().getId());
        if(list.size() > 0){
            throw new MessageException("Bạn đã gửi CV cho công việc này rồi");
        }
        jobApplication.setCreatedDate(new Date(System.currentTimeMillis()));
        jobApplication.setUser(userUtils.getUserWithAuthority());
        jobApplicationRepository.save(jobApplication);
    }

    @Override
    public void delete(Long id) {
        jobApplicationRepository.deleteById(id);
    }

    @Override
    public JobApplication findById(Long id) {
        return jobApplicationRepository.findById(id).get();
    }
}
