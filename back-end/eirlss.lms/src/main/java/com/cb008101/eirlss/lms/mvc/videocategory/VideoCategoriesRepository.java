package com.cb008101.eirlss.lms.mvc.videocategory;

import com.cb008101.eirlss.lms.mvc.videocategory.VideoCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCategoriesRepository extends JpaRepository<VideoCategories, Long> {
}
