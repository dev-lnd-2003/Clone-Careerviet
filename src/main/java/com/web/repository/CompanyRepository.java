package com.web.repository;

import com.web.entity.Career;
import com.web.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company,Long> {

    @Query("select c from Company c where c.user.id = ?1")
    public Company findByUser(Long userId);

    @Query(value = "select top 6 c.*,\n" +
            "(select COUNT(j.id) from job j where j.company_id = c.id) as sl from company c\n" +
            "order by sl asc", nativeQuery = true)
    public List<Company> topCompany();
}
