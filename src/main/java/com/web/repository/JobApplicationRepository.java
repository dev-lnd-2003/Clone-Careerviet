package com.web.repository;

import com.web.entity.JobApplication;
import com.web.entity.JobCareer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    @Query("select j from JobApplication j where j.job.id = ?1")
    public List<JobApplication> findByJob(Long jobId);

    @Query("select j from JobApplication j where j.job.id = ?1 and j.user.id = ?2")
    public List<JobApplication> findByJobAndUser(Long jobId, Long userId);

    @Query("select j from JobApplication j where j.user.id = ?1")
    public List<JobApplication> findByUser(Long userId);
}
