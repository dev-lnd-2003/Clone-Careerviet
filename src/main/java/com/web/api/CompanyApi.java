package com.web.api;

import com.web.dto.CompanyResponse;
import com.web.entity.Company;
import com.web.entity.Salary;
import com.web.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@CrossOrigin
public class CompanyApi {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/partner/update")
    public ResponseEntity<?> update(@RequestBody Company company){
        CompanyResponse result = companyService.update(company);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/partner/my-company")
    public ResponseEntity<?> myCompany(){
        CompanyResponse result = companyService.findByUser();
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/admin/all-company")
    public ResponseEntity<?> allCompany(){
        List<Company> result = companyService.findAll();
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/public/top-company")
    public ResponseEntity<?> topCompany(){
        List<Company> result = companyService.topCompany();
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
}
