package com.cb008101.eirlss.lms.bookcategories;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("book/categories/")
public class BookCategoriesController
{

    private final BookCategoriesService bookCategoriesService;

    @Autowired
    public BookCategoriesController(BookCategoriesService bookCategoriesService)
    {
        this.bookCategoriesService = bookCategoriesService;
    }


    @PostMapping
    public BookCategories save(@Valid @RequestBody BookCategories category)
    {
        return bookCategoriesService.save(category);
    }

    @PutMapping
    public BookCategories update(@Valid @RequestBody BookCategories category)
    {
        return bookCategoriesService.save(category);
    }

    @DeleteMapping(path = "category/{id}")
    public void delete(@PathVariable("id") long id)
    {
        bookCategoriesService.deleteById(id);
    }

    @GetMapping
    public List<BookCategories> list()
    {
        return bookCategoriesService.findAll();
    }
}
