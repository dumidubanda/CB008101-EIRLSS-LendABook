package com.cb008101.eirlss.lms.dto;

import com.cb008101.eirlss.lms.videoreservations.VideoReservations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideosDto implements Serializable
{
    private Long id;
    private String name;

    public static VideosDto build(VideoReservations videoReservations)
    {
        return new VideosDto(videoReservations.getVideo().getId(),
                videoReservations.getVideo().getName());
    }
}
