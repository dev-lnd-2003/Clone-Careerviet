package com.web.repository;

import com.web.entity.Blog;
import com.web.entity.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CareerRepository extends JpaRepository<Career,Long> {

    @Query(value = "select c.*,\n" +
            "(select COUNT(jc.id) from job_career jc where jc.career_id = c.id) as quantity\n" +
            "from career c", nativeQuery = true)
    public List<Object[]> allCareer();
}
