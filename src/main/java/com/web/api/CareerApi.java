package com.web.api;

import com.web.dto.CareerDto;
import com.web.entity.Blog;
import com.web.entity.Career;
import com.web.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/career")
@CrossOrigin
public class CareerApi {

    @Autowired
    private CareerService careerService;

    @PostMapping("/admin/create-or-update")
    public ResponseEntity<?> save(@RequestBody Career career){
        Career result = careerService.saveOrUpdate(career);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        careerService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/public/findAll-list")
    public ResponseEntity<?> findAllList(Pageable pageable){
        List<Career> result = careerService.findAll();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/public/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        Career result = careerService.findById(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/public/find-all-quantity")
    public ResponseEntity<?> findAll(){
        List<CareerDto> result = careerService.allCareer();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}
