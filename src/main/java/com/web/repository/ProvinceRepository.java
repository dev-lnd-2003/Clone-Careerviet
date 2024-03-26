package com.web.repository;

import com.web.entity.Province;
import com.web.entity.Salary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProvinceRepository extends JpaRepository<Province,Long> {
}
