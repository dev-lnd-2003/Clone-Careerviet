package com.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "company")
@Getter
@Setter
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private String address;

    private String phone;

    private String typeOfActivity;

    private String website;

    private String image;

    @Column(columnDefinition="ntext")
    private String description;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
