package com.web.api;

import com.web.dto.CompanyResponse;
import com.web.dto.JobDto;
import com.web.dto.SearchDto;
import com.web.entity.Company;
import com.web.entity.Job;
import com.web.enums.JobStatus;
import com.web.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/job")
@CrossOrigin
public class JobApi {

    @Autowired
    private JobService jobService;

    @PostMapping("/partner/save-or-update")
    public ResponseEntity<?> saveOrUpdate(@RequestBody JobDto jobDto){
        Job result = jobService.saveOrUpdate(jobDto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/partner/my-job")
    public ResponseEntity<?> myJob(@RequestParam(value = "stt", required = false) String sstName){
        List<Job> result = jobService.findByUser(sstName);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/public/all-job")
    public ResponseEntity<?> allJob(){
        List<Job> result = jobService.findAll();
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/public/job-by-id")
    public ResponseEntity<?> findByid(@RequestParam Long id){
        Job result = jobService.findById(id);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/partner/delete")
    public ResponseEntity<?> deleteByid(@RequestParam Long id){
        jobService.delete(id);
        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }

    @GetMapping("/public/get-all-status-job")
    public ResponseEntity<?> getAllStatus(){
        List<String> result = Stream.of(JobStatus.values())
                .map(Enum::name)
                .collect(Collectors.toList());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/admin/update-status")
    public ResponseEntity<?> updateStatus(@RequestParam(value = "stt") String sstName,
                                          @RequestParam("id") Long id){
        jobService.updateStatusJob(id, sstName);
        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }

    @GetMapping("/admin/all-job-by-admin")
    public ResponseEntity<?> allJobByAdmin(@RequestParam(value = "stt", required = false) String sstName,
                                           @RequestParam(value = "from", required = false) Date from,
                                           @RequestParam(value = "to", required = false) Date to){
        List<Job> result = jobService.findAllByAdmin(sstName, from, to);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/public/all-job-by-user")
    public ResponseEntity<?> jobUser(Pageable pageable){
        Page<Job> result = jobService.findAll(pageable);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping("/public/search-full-job")
    public ResponseEntity<?> searchFull(@RequestBody SearchDto searchDto, Pageable pageable){
        Page<Job> result = jobService.searchAll(searchDto, pageable);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping("/public/relate-job")
    public ResponseEntity<?> relateJob(@RequestParam("id") Long id){
        List<Job> result = jobService.relateJob(id);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/public/top-job")
    public ResponseEntity<?> topJob(){
        List<Job> result = jobService.getTopJob();
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
}
