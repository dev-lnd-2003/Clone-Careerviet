package com.web.serviceimp;

import com.web.dto.JobDto;
import com.web.dto.SearchDto;
import com.web.entity.*;
import com.web.enums.JobStatus;
import com.web.repository.*;
import com.web.service.JobService;
import com.web.utils.CommonPage;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class JobServiceImp implements JobService {

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobWelfareRepository jobWelfareRepository;

    @Autowired
    private JobCareerRepository jobCareerRepository;

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private CommonPage commonPage;

    @Autowired
    EntityManager em;

    @Override
    public Job saveOrUpdate(JobDto jobDto) {
        Job job = jobDto.getJob();
        Company company = companyRepository.findByUser(userUtils.getUserWithAuthority().getId());
        job.setCompany(company);
        if(job.getId() == null){
            job.setCreatedDate(new Date(System.currentTimeMillis()));
            job.setJobStatus(JobStatus.WAITTING);
        }
        else{
            Job j = jobRepository.findById(job.getId()).get();
            job.setCreatedDate(j.getCreatedDate());
            job.setUpdatedDate(new Date(System.currentTimeMillis()));
            jobWelfareRepository.deleteByJob(j.getId());
            jobCareerRepository.deleteByJob(j.getId());
            job.setJobStatus(j.getJobStatus());
        }
        Job result = jobRepository.save(job);

        for(Career c : jobDto.getCareers()){
            JobCareer jobCareer = new JobCareer();
            jobCareer.setJob(result);
            jobCareer.setCareer(c);
            jobCareerRepository.save(jobCareer);
        }
        for(Welfare w : jobDto.getWelfare()){
            JobWelfare jobWelfare = new JobWelfare();
            jobWelfare.setJob(result);
            jobWelfare.setWelfare(w);
            jobWelfareRepository.save(jobWelfare);
        }
        return result;
    }

    @Override
    public List<Job> findByUser(String sttName) {
        User user = userUtils.getUserWithAuthority();
        List<Job> list = null;
        if(sttName == null){
            list = jobRepository.myJob(user.getId());
        }
        else{
            JobStatus jobStatus = null;
            for (JobStatus o : JobStatus.values()) {
                if(o.name().equals(sttName)){
                    jobStatus = o;
                }
            }
            list = jobRepository.myJob(user.getId(), jobStatus);
        }
        return list;
    }

    @Override
    public List<Job> findAll() {
        return jobRepository.findAll();
    }

    @Override
    public Job findById(Long id) {
        Optional<Job> job = jobRepository.findById(id);
        return job.get();
    }

    @Override
    public void delete(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public void updateStatusJob(Long id, String sttName) {
        Job job = jobRepository.findById(id).get();
        JobStatus jobStatus = null;
        for (JobStatus o : JobStatus.values()) {
            if(o.name().equals(sttName)){
                jobStatus = o;
            }
        }
        job.setJobStatus(jobStatus);
        jobRepository.save(job);
    }

    @Override
    public List<Job> findAllByAdmin(String sttName, Date from, Date to) {
        if(from == null || to == null){
            from = Date.valueOf("2000-01-01");
            to = Date.valueOf("2200-01-01");
        }
        List<Job> list = null;
        if(sttName == null){
            list = jobRepository.getJob(from, to);
        }
        else{
            JobStatus jobStatus = null;
            for (JobStatus o : JobStatus.values()) {
                if(o.name().equals(sttName)){
                    jobStatus = o;
                }
            }
            list = jobRepository.getJob(from, to, jobStatus);
        }
        return list;
    }

    @Override
    public Page<Job> findAll(Pageable pageable) {

        return jobRepository.findAll(JobStatus.SHOWING, pageable);
    }

    @Override
    public Page<Job> searchAll(SearchDto dto, Pageable pageable) {
        if(dto.getSearch() == null){
            dto.setSearch("");
        }
        dto.setSearch("%"+dto.getSearch()+"%");
        String sql = "select j.id from job j inner join job_career jc on jc.job_id = j.id " +
                "inner join company c on c.id = j.company_id inner join districts d on d.id = j.districts_id \n" +
                "inner join salary s on s.id = j.salary_id \n" +
                "where j.job_status = 1 and (j.rank like ? or j.experience like ? or c.name like ?) ";

        String sqlCount = "select COUNT(*) from(select j.id from job j inner join job_career jc on jc.job_id = j.id " +
                "inner join company c on c.id = j.company_id inner join districts d on d.id = j.districts_id \n" +
                "inner join salary s on s.id = j.salary_id \n" +
                "where j.job_status = 1 and (j.rank like ? or j.experience like ? or c.name like ?) ";

        sql +=" and s.min_money >= ? ";
        sqlCount +=" and s.min_money >= ? ";

        sql += dto.getProvinceId() != null ? " and d.province_id = ? " :  " and d.province_id != ?";
        sqlCount += dto.getProvinceId() != null ? " and d.province_id = ? " :  " and d.province_id != ?";
        if(dto.getCareerId() != null){
            if(dto.getCareerId().size() > 0){
                sql += " and (";
                sqlCount += " and (";
                for(int i=0; i<dto.getCareerId().size(); i++){
                    sql += " jc.career_id = ? ";
                    sqlCount += " jc.career_id = ? ";
                    if(i < dto.getCareerId().size() - 1){
                        sql += " or ";
                        sqlCount += " or ";
                    }
                }

                sql += " ) ";
                sqlCount += " ) ";
            }
        }
        sql += " group by j.id order by j.id desc";
        sqlCount += " group by j.id) as tot";
        Query query = em.createNativeQuery(sql);
        Query queryCount = em.createNativeQuery(sqlCount);

        query.setParameter(1,dto.getSearch());
        queryCount.setParameter(1,dto.getSearch());
        query.setParameter(2,dto.getSearch());
        queryCount.setParameter(2,dto.getSearch());
        query.setParameter(3,dto.getSearch());
        queryCount.setParameter(3,dto.getSearch());
        if(dto.getSalaryId() == null){
            query.setParameter(4,0D);
            queryCount.setParameter(4,0D);
        }
        else{
            Salary salary = salaryRepository.findById(dto.getSalaryId()).get();
            query.setParameter(4,salary.getMinMoney());
            queryCount.setParameter(4,salary.getMinMoney());
        }
        query.setParameter(5,dto.getProvinceId() != null?dto.getProvinceId():0);
        queryCount.setParameter(5,dto.getProvinceId() != null?dto.getProvinceId():0);
        if(dto.getCareerId() != null){
            if(dto.getCareerId().size() > 0){
                int x=5;
                for(int i=0; i<dto.getCareerId().size(); i++){
                    x+=1;
                    query.setParameter(x,dto.getCareerId().get(i));
                    queryCount.setParameter(x,dto.getCareerId().get(i));
                }
            }
        }

        query.setMaxResults(pageable.getPageSize());
        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        System.out.println("sql count: "+sqlCount);

        List<BigDecimal> listId = query.getResultList();
        Integer total = (Integer) queryCount.getSingleResult();
        List<Long> longs = new ArrayList<>();
        for(BigDecimal b: listId){
            longs.add(Long.valueOf(b.toString()));
        }
        Iterable<Long> iterable = longs;
        List<Job> list = jobRepository.findAllById(iterable);

        Page<Job> page = new PageImpl<>(list,pageable,total.longValue());
        System.out.println("===== sql: " + sql);
        System.out.println("===== sql: " + total);

        return page;
    }

    @Override
    public List<Job> relateJob(Long id) {
        Job job = jobRepository.findById(id).get();
        String sql = "select top 5 j.id from job j inner join job_career jc on jc.job_id = j.id\n" +
                "where j.id != ? ";
        if(job.getJobCareers().size() > 0){
            sql += " and ( ";
            for(int i=0; i< job.getJobCareers().size(); i++){
                sql += " jc.career_id = ? ";
                if(i< job.getJobCareers().size() - 1){
                    sql += " or ";
                }
            }
            sql += " ) ";
        }
        sql += " group by j.id";
        Query query = em.createNativeQuery(sql);
        query.setParameter(1,id);
        int x = 1;
        for(int i=0; i< job.getJobCareers().size(); i++){
            x += 1;
            query.setParameter(x, job.getJobCareers().get(i).getCareer().getId());
        }
        List<BigDecimal> listId = query.getResultList();
        List<Long> longs = new ArrayList<>();
        for(BigDecimal b: listId){
            longs.add(Long.valueOf(b.toString()));
        }
        Iterable<Long> iterable = longs;
        List<Job> list = jobRepository.findAllById(iterable);
        return list;
    }

    @Override
    public List<Job> getTopJob() {
        return jobRepository.getTopJob();
    }
}
