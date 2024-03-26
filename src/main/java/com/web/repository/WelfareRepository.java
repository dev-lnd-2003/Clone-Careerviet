package com.web.repository;

import com.web.entity.Salary;
import com.web.entity.Welfare;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WelfareRepository extends JpaRepository<Welfare,Long> {
}
