package com.web.api;

import com.web.entity.Salary;
import com.web.entity.Welfare;
import com.web.service.WelfareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/welfare")
@CrossOrigin
public class WelfareApi {

    @Autowired
    private WelfareService welfareService;

    @PostMapping("/admin/create-or-update")
    public ResponseEntity<?> save(@RequestBody Welfare welfare){
        Welfare result = welfareService.saveOrUpdate(welfare);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        welfareService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/public/findAll-list")
    public ResponseEntity<?> findAllList(Pageable pageable){
        List<Welfare> result = welfareService.findAll();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/public/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        Welfare result = welfareService.findById(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
