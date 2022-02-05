package com.cb008101.eirlss.lms.dto;


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
public class BooksFullDto implements Serializable
{

    int copies;
    int Dimensions;
    long pages;
    int readingAge;
    private Long id;
    private String name;
    private byte[] data;
    private double price;
    private String language;
    private String publisher;
    private LocalDateTime publishingDate;
    private byte[] coverImage;
    private String author;
    private String category;
    private List<CommentDto> comments;
}
