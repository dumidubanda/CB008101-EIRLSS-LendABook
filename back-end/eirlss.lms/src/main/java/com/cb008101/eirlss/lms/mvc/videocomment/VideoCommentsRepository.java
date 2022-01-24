package com.cb008101.eirlss.lms.mvc.videocomment;

import com.cb008101.eirlss.lms.mvc.videocomment.VideoComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCommentsRepository extends JpaRepository<VideoComments, Long> {
}
