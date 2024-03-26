package com.web.repository;
import com.web.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
public interface BlogRepository extends JpaRepository<Blog,Long> {

    @Modifying
    @Transactional
    @Query("update Blog b set b.primaryBlog = false")
    int unSetPrimary();

    @Query("select b from Blog b where b.primaryBlog = true")
    public Optional<Blog> blogPrimary();

    @Query("select b from Blog b ")
    public Optional<Blog> firstBlog();

    @Query(value = "select top 3 * from blog order by num_view desc", nativeQuery = true)
    public List<Blog> topBlog();

    @Query(value = "select top 2 * from blog order by num_view desc", nativeQuery = true)
    public List<Blog> top2Blog();
}
