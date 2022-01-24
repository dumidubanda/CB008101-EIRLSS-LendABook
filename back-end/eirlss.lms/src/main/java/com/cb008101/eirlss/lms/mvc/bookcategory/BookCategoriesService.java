package com.cb008101.eirlss.lms.mvc.bookcategory;

import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookCategoriesService implements CrudRepository<BookCategories> {

    private BookCategoriesRepository bookCategoriesRepository;

    @Autowired
    public BookCategoriesService(BookCategoriesRepository bookCategoriesRepository) {
        this.bookCategoriesRepository = bookCategoriesRepository;
    }

    @Override
    public BookCategories save(BookCategories category){
        return bookCategoriesRepository.save(category);
    }
    @Override
    public void deleteById(long id){
        bookCategoriesRepository.deleteById(id);
    }
    @Override
    public List<BookCategories> findAll(){
        return bookCategoriesRepository.findAll();
    }
    @Override
    public Optional<BookCategories> findById(long id){ return bookCategoriesRepository.findById(id); }
}
