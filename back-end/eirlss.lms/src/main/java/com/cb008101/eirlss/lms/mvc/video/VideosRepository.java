package com.cb008101.eirlss.lms.mvc.video;


import com.cb008101.eirlss.lms.mvc.video.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideosRepository extends JpaRepository<Videos, Long> {
    List<Videos> findByNameContaining(String name);
}
