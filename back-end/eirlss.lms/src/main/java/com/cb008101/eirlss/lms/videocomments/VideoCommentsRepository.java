package com.cb008101.eirlss.lms.videocomments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCommentsRepository extends JpaRepository<VideoComments, Long>
{
}
