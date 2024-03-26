package com.web.service;

import com.web.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BlogService {

    public Blog saveOrUpdate(Blog blog);

    public void delete(Long id);

    public Blog findById(Long id);

    public Blog blogPrimary();

    public Page<Blog> findAll(Pageable pageable);

    public List<Blog> findAll();

    public List<Blog> topBlog();

    public List<Blog> top2Blog();


}