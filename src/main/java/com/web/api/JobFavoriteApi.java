package com.web.api;

import com.web.entity.JobApplication;
import com.web.entity.JobFavorite;
import com.web.service.JobFavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobfavorite")
@CrossOrigin
public class JobFavoriteApi {

    @Autowired
    private JobFavoriteService jobFavoriteService;

    @PostMapping("/user/create")
    public ResponseEntity<?> create(@RequestBody JobFavorite jobFavorite){
        jobFavoriteService.saveFav(jobFavorite);
        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }

    @GetMapping("/user/my-favorite")
    public ResponseEntity<?> myFavorite(){
        List<JobFavorite> result = jobFavoriteService.myFav();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/user/num-my-favorite")
    public ResponseEntity<?> numMyFavorite(){
        Long result = jobFavoriteService.numMyFav();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/user/check-my-favorite")
    public ResponseEntity<?> numMyFavorite(@RequestParam Long id){
        Boolean result = jobFavoriteService.checkFav(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/user/delete-my-favorite")
    public ResponseEntity<?> deleteMyFavorite(@RequestParam Long id){
        jobFavoriteService.delete(id);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
