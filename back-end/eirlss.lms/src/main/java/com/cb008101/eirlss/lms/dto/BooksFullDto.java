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
public class BooksFullDto implements Serializable {

    private Long id;
    private String name;
    private byte[] data;
    private double price;
    int copies;
    private String language;
    private String publisher;
    private LocalDateTime publishingDate;
    int Dimensions;
    private byte[] coverImage;
    long pages;
    private String author;
    int readingAge;
    private String category;
    private List<CommentDto> comments;
}
