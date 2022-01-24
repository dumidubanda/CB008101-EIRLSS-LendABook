package com.cb008101.eirlss.lms.mvc.book;


import com.cb008101.eirlss.lms.dto.BooksFullDto;
import com.cb008101.eirlss.lms.dto.CommentDto;
import org.hibernate.Hibernate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("books/")
public class BooksController
{

    private BooksService booksService;

    @Autowired
    public BooksController(BooksService booksService) {
        this.booksService = booksService;
    }




    @PostMapping
    public Books create(@Valid @RequestBody Books book) {
        return booksService.save(book);
    }

    @PutMapping
    public Books update(@Valid @RequestBody Books book){ return booksService.save(book); }

    @DeleteMapping(path = "book/{id}")
    public void delete(@PathVariable("id") long id){ booksService.deleteById(id); }

    @GetMapping(path = "book/{id}")
    public BooksFullDto get(@PathVariable("id") long id){
        BooksFullDto response = null;
        Optional<Books> book = booksService.findById(id);
        if(book.isPresent()){
            Books bookEntity = book.get();
            Hibernate.initialize(bookEntity.getCategory());
            Hibernate.initialize(bookEntity.getComments());
            response = new BooksFullDto();
            BeanUtils.copyProperties(bookEntity, response);
            response.setCategory(bookEntity.getCategory().getName());
            response.setComments(bookEntity.getComments().stream().map(CommentDto::build).collect(Collectors.toList()));
        }
        return response;
    }

    @GetMapping
    public List<Books> list() { return booksService.findAll(); }

    @GetMapping(path = "search/{name}")
    public List<Books> search(@PathVariable("name") String name){ return booksService.findAllByName(name); }
}
