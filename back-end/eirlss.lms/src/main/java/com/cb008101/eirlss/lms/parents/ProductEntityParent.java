package com.cb008101.eirlss.lms.parents;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@MappedSuperclass
public class ProductEntityParent
{

    @Column
    int copies;

    @Column
    int Dimensions;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Lob
    @Column(nullable = false)
    private byte[] data;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private String language;
    @Column(nullable = false)
    private String publisher;
    @Column(nullable = false)
    private LocalDateTime publishingDate;
}
