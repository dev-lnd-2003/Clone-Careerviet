package com.web.repository;

import com.web.entity.Job;
import com.web.entity.JobCareer;
import com.web.entity.JobFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JobFavoriteRepository  extends JpaRepository<JobFavorite,Long> {

    @Query("select j from JobFavorite j where j.user.id = ?1")
    List<JobFavorite> findByUser(Long userId);

    @Query("select count(j) from JobFavorite j where j.user.id = ?1")
    public Long numMyJob(Long userId);

    @Query("select j from JobFavorite j where j.user.id = ?1 and j.job.id = ?2")
    public Optional<JobFavorite> findByUserAndJob(Long userId, Long jobId);
}
