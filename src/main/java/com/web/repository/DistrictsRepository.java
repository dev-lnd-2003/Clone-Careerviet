package com.web.repository;

import com.web.entity.Districts;
import com.web.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DistrictsRepository extends JpaRepository<Districts,Long> {

    @Query("select d from Districts d where d.province.id = ?1")
    public List<Districts> findByProvinceId(Long id);
}
