package com.cb008101.eirlss.lms.dto;


import com.cb008101.eirlss.lms.users.Users;
import com.cb008101.eirlss.lms.videoreservations.VideoReservations;
import com.cb008101.eirlss.lms.videos.Videos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideoReservationsDto implements Serializable
{
    private Long id;
    private VideosDto video;
    private Users user;
    private LocalDateTime reservationDate;

    public static VideoReservations build(VideoReservationsDto reservationsDto)
    {
        VideoReservations reservations = new VideoReservations();
        Videos video = new Videos();
        video.setId(reservationsDto.getVideo().getId());
        reservations.setVideo(video);
        reservations.setUser(reservationsDto.getUser());
        reservations.setReservationDate(reservationsDto.getReservationDate());
        return reservations;
    }

    public static VideoReservationsDto build(VideoReservations reservations)
    {
        VideoReservationsDto reservationsDto = new VideoReservationsDto();
        reservationsDto.setId(reservations.getId());
        reservationsDto.setVideo(VideosDto.build(reservations));
        reservationsDto.setUser(reservations.getUser());
        reservationsDto.setReservationDate(reservations.getReservationDate());
        return reservationsDto;
    }
}
