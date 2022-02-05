package com.cb008101.eirlss.lms.dto;


import com.cb008101.eirlss.lms.videocategory.VideoCategories;
import com.cb008101.eirlss.lms.videocomments.VideoComments;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VideosFullDto implements Serializable
{

    int copies;
    int Dimensions;
    int watchingAge;
    private Long id;
    private String name;
    private byte[] data;
    private double price;
    private String language;
    private String publisher;
    private LocalDateTime publishingDate;
    private String director;
    private String country;
    private long duration;
    private VideoCategories category;
    private List<VideoComments> comments;
}
