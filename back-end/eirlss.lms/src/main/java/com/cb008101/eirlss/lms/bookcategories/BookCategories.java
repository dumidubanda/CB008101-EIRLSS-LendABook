package com.cb008101.eirlss.lms.bookcategories;

import com.cb008101.eirlss.lms.books.Books;
import com.cb008101.eirlss.lms.parents.CategoryEntityParent;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;


@Entity
@Setter
@Getter
@NoArgsConstructor
public class BookCategories extends CategoryEntityParent
{

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@JsonManagedReference
    private List<Books> books;
}
