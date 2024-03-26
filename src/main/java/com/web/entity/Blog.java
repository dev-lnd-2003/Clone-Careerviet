package com.web.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "blog")
@Getter
@Setter
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private Date createdDate;

    @Column(length = 1000)
    private String title;

    @Column(length = 3800)
    private String description;

    @Column(columnDefinition="ntext")
    private String content;

    private Boolean primaryBlog;

    private String imageBanner;

    private Integer numView;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
