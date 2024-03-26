package com.web.serviceimp;

import com.web.entity.JobFavorite;
import com.web.exception.MessageException;
import com.web.repository.JobFavoriteRepository;
import com.web.service.JobFavoriteService;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class JobFavoriteServiceImp implements JobFavoriteService {

    @Autowired
    private JobFavoriteRepository jobFavoriteRepository;

    @Autowired
    private UserUtils userUtils;

    @Override
    public List<JobFavorite> myFav() {
        return jobFavoriteRepository.findByUser(userUtils.getUserWithAuthority().getId());
    }

    @Override
    public Long numMyFav() {
        return jobFavoriteRepository.numMyJob(userUtils.getUserWithAuthority().getId());
    }

    @Override
    public void saveFav(JobFavorite jobFavorite) {
        Optional<JobFavorite> jobFa = jobFavoriteRepository.findByUserAndJob(userUtils.getUserWithAuthority().getId(), jobFavorite.getJob().getId());
        if(jobFa.isPresent()){
            throw new MessageException("Đã thêm vào yêu thích");
        }
        jobFavorite.setUser(userUtils.getUserWithAuthority());
        jobFavoriteRepository.save(jobFavorite);
    }

    @Override
    public void delete(Long id) {
        jobFavoriteRepository.deleteById(id);
    }

    @Override
    public Boolean checkFav(Long jobId) {
        Optional<JobFavorite> jobFa = jobFavoriteRepository.findByUserAndJob(userUtils.getUserWithAuthority().getId(),jobId);
        if(jobFa.isPresent()){
            return true;
        }
        return false;
    }
}
