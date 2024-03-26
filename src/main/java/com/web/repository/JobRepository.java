package com.web.repository;

import com.web.entity.Districts;
import com.web.entity.Job;
import com.web.enums.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {

    @Query("select j from Job j where j.company.user.id= ?1")
    public List<Job> myJob(Long userId);

    @Query("select j from Job j where j.company.user.id= ?1 and j.jobStatus = ?2")
    public List<Job> myJob(Long userId, JobStatus jobStatus);

    @Query("select j from Job j where j.createdDate >= ?1 and j.createdDate <= ?2")
    public List<Job> getJob(Date from, Date to);

    @Query("select j from Job j where j.createdDate >= ?1 and j.createdDate <= ?2 and j.jobStatus = ?3")
    public List<Job> getJob(Date from, Date to, JobStatus jobStatus);


    @Query(value = "select top 20 j.*,\n" +
            "(select COUNT(ja.id) from job_application ja where ja.job_id = j.id) as sl\n" +
            "from job j order by sl desc", nativeQuery = true)
    public List<Job> getTopJob();

    @Query(value = "select COUNT(j.id) from job j where MONTH(j.created_date) = ?1 and YEAR(j.created_date) = ?2", nativeQuery = true)
    public Double jobCurMonth(Integer month, Integer year);

    @Query("select j from Job j where j.jobStatus = ?1")
    public Page<Job> findAll(JobStatus jobStatus, Pageable pageable);
}
