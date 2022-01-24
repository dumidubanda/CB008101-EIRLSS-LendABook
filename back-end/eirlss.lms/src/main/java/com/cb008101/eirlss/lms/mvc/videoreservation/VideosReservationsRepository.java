package com.cb008101.eirlss.lms.mvc.videoreservation;

import com.cb008101.eirlss.lms.mvc.videoreservation.VideoReservations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideosReservationsRepository extends JpaRepository<VideoReservations, Long> {
}
