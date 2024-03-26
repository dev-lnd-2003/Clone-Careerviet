package com.web.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.enums.JobStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "job")
@Getter
@Setter
@ToString
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String title;

    private String addressDetail;

    private String workingForm;

    private String experience;

    private String rank;

    private Date expirationDate;

    private Date createdDate;

    private Date updatedDate;

    private JobStatus jobStatus;

    @Column(length = 3800)
    private String requireJon;

    @Column(length = 3800)
    private String anotherInfor;

    @Column(columnDefinition="ntext")
    private String description;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "salary_id")
    private Salary salary;

    @ManyToOne
    @JoinColumn(name = "districts_id")
    private Districts districts;

    @OneToMany(mappedBy = "job", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<JobCareer> jobCareers = new ArrayList<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<JobWelfare> jobWelfares = new ArrayList<>();
}
