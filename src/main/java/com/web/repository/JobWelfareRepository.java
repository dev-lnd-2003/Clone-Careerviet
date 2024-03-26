package com.web.repository;

import com.web.entity.Job;
import com.web.entity.JobWelfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface JobWelfareRepository extends JpaRepository<JobWelfare,Long> {

    @Modifying
    @Transactional
    @Query("delete from JobWelfare p where p.job.id = ?1")
    int deleteByJob(Long jobId);
}
