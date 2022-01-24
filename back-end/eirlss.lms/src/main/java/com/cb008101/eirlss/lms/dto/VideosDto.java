package com.cb008101.eirlss.lms.dto;

import com.cb008101.eirlss.lms.mvc.videoreservation.VideoReservations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideosDto {
    private Long id;
    private String name;

    public static VideosDto build(VideoReservations videoReservations){
        return new VideosDto(videoReservations.getVideo().getId(),
                videoReservations.getVideo().getName());
    }
}
