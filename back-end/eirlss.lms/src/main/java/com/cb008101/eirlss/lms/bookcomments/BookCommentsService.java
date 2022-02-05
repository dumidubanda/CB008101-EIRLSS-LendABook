package com.cb008101.eirlss.lms.bookcomments;

import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookCommentsService implements CrudRepository<BookComments>
{

    private final BookCommentsRepository bookCommentsRepository;

    @Autowired
    public BookCommentsService(BookCommentsRepository bookCommentsRepository)
    {
        this.bookCommentsRepository = bookCommentsRepository;
    }

    @Override
    public BookComments save(BookComments comment)
    {
        return bookCommentsRepository.save(comment);
    }

    @Override
    public void deleteById(long id)
    {
        bookCommentsRepository.deleteById(id);
    }

    @Override
    public List<BookComments> findAll()
    {
        return bookCommentsRepository.findAll();
    }

    @Override
    public Optional<BookComments> findById(long id)
    {
        return bookCommentsRepository.findById(id);
    }
}
