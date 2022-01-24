package com.cb008101.eirlss.lms.books;


import com.cb008101.eirlss.lms.mvc.bookcategory.BookCategories;
import com.cb008101.eirlss.lms.mvc.bookcategory.BookCategoriesService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class BookCategoryRepositoryTest
{
    @Autowired
    private BookCategoriesService bookCategoriesService;

    @Test
    void testSaveBookCategory()
    {
        BookCategories category = new BookCategories();
        category.setName("Sci-Fi");

        bookCategoriesService.save(category);
        //Assertions.assertThat(employee.getId()).isEqualTo(27);
        Assertions.assertThat(category.getId()).isGreaterThan(0);
    }

    @Test
    void getAllBookCategoriesTest() {
        List<BookCategories> category = (List<BookCategories>) bookCategoriesService.findAll();
        System.out.println("\nSize : "+category.size());
        assertThat(category.size()).isGreaterThan(0);
    }
}
