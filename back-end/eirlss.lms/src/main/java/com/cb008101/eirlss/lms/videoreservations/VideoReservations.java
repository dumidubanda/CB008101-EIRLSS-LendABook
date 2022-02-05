package com.cb008101.eirlss.lms.videoreservations;


import com.cb008101.eirlss.lms.parents.ReservationEntityParent;
import com.cb008101.eirlss.lms.videos.Videos;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class VideoReservations extends ReservationEntityParent
{

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id", nullable = false)
    private Videos video;
}
