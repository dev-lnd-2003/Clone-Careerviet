package com.web.api;

import com.web.entity.Career;
import com.web.entity.Salary;
import com.web.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salary")
@CrossOrigin
public class SalaryApi {

    @Autowired
    private SalaryService salaryService;

    @PostMapping("/admin/create-or-update")
    public ResponseEntity<?> save(@RequestBody Salary salary){
        Salary result = salaryService.saveOrUpdate(salary);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        salaryService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/public/findAll-list")
    public ResponseEntity<?> findAllList(Pageable pageable){
        List<Salary> result = salaryService.findAll();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/public/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        Salary result = salaryService.findById(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
