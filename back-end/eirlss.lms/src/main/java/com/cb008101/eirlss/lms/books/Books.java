package com.cb008101.eirlss.lms.books;


import com.cb008101.eirlss.lms.bookcategories.BookCategories;
import com.cb008101.eirlss.lms.bookcomments.BookComments;
import com.cb008101.eirlss.lms.parents.ProductEntityParent;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Books extends ProductEntityParent
{

    @Column
    long pages;
    @Column
    int readingAge;
    @Lob
    @Column(nullable = false)
    private byte[] coverImage;
    @Column(nullable = false)
    private String author;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "category_id", nullable = false)
    private BookCategories category;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookComments> comments;

}
