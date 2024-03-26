package com.web.service;

import com.web.entity.JobFavorite;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JobFavoriteService {

    public List<JobFavorite> myFav();

    public Long numMyFav();

    public void saveFav(JobFavorite jobFavorite);

    public void delete(Long id);

    public Boolean checkFav(Long jobId);
}
