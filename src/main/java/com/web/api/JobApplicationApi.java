package com.web.api;

import com.web.dto.CompanyResponse;
import com.web.entity.Company;
import com.web.entity.JobApplication;
import com.web.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobapplication")
@CrossOrigin
public class JobApplicationApi {

    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping("/user/create")
    public ResponseEntity<?> update(@RequestBody JobApplication jobApplication){
        jobApplicationService.save(jobApplication);
        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }

    @GetMapping("/partner/find-by-job-id")
    public ResponseEntity<?> findByJob(@RequestParam Long id){
        List<JobApplication> result = jobApplicationService.findByJob(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/user/find-by-job-and-user")
    public ResponseEntity<?> findByJobAndUser(@RequestParam Long id){
        List<JobApplication> result = jobApplicationService.findByJobAndUser(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/user/find-by-user")
    public ResponseEntity<?> findByUser(){
        List<JobApplication> result = jobApplicationService.findByUser();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/partner/find-by-id")
    public ResponseEntity<?> findById(@RequestParam Long id){
        JobApplication result = jobApplicationService.findById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
