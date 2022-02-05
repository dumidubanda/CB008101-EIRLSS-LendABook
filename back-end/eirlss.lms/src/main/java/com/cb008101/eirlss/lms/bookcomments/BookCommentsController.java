package com.cb008101.eirlss.lms.bookcomments;


import com.cb008101.eirlss.lms.dto.CommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("book/comments/")
public class BookCommentsController
{

    private final BookCommentsService bookCommentsService;

    @Autowired
    public BookCommentsController(BookCommentsService bookCommentsService)
    {
        this.bookCommentsService = bookCommentsService;
    }

    @PostMapping
    public CommentDto create(@Valid @RequestBody CommentDto comment)
    {
        return CommentDto.build(bookCommentsService.save(BookComments.convert(comment)));
    }

    @PutMapping
    public CommentDto update(@Valid @RequestBody CommentDto comment)
    {
        return CommentDto.build(bookCommentsService.save(BookComments.convert(comment)));
    }

    @DeleteMapping(path = "comment/{id}")
    public void delete(@PathVariable("id") long id)
    {
        bookCommentsService.deleteById(id);
    }
}
