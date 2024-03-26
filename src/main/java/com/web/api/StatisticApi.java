package com.web.api;
import com.web.repository.CompanyRepository;
import com.web.repository.JobRepository;
import com.web.repository.UserRepository;
import com.web.utils.Contains;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/statistic")
@CrossOrigin
public class StatisticApi {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping("/admin/number-user")
    public Double numberUser(@RequestParam String role){
        return userRepository.countByRole(role);
    }

    @GetMapping("/admin/number-job")
    public Long numberJob(){
        return jobRepository.count();
    }

    @GetMapping("/admin/number-company")
    public Long numCompany(){
        return companyRepository.count();
    }

    @GetMapping("/admin/number-job-cur-month")
    public Double numberJobThisMonth(){
        Date date = new Date(System.currentTimeMillis());
        Integer month = Integer.valueOf(date.toString().split("-")[1]);
        Integer year = Integer.valueOf(date.toString().split("-")[0]);
        return jobRepository.jobCurMonth(month, year);
    }

    @GetMapping("/admin/number-user-cur-month")
    public Double numberUserThisMonth(){
        Date date = new Date(System.currentTimeMillis());
        Integer month = Integer.valueOf(date.toString().split("-")[1]);
        Integer year = Integer.valueOf(date.toString().split("-")[0]);
        return userRepository.userCurMonth(month, year);
    }
}
