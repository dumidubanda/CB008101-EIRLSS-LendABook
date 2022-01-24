package com.cb008101.eirlss.lms.dto;


import com.cb008101.eirlss.lms.mvc.videocategory.VideoCategories;
import com.cb008101.eirlss.lms.mvc.videocomment.VideoComments;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideosFullDto {

    private Long id;
    private String name;
    private byte[] data;
    private double price;
    int copies;
    private String language;
    private String publisher;
    private LocalDateTime publishingDate;
    int Dimensions;
    private String director;
    private String country;
    private long duration;
    int watchingAge;
    private VideoCategories category;
    private List<VideoComments> comments;
}
