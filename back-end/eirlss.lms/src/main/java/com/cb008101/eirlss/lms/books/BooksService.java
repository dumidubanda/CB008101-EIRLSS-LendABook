package com.cb008101.eirlss.lms.books;


import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BooksService implements CrudRepository<Books>
{

    private final BooksRepository booksRepository;

    @Autowired
    public BooksService(BooksRepository booksRepository)
    {
        this.booksRepository = booksRepository;
    }

    @Override
    public Books save(Books book)
    {
        return booksRepository.save(book);
    }

    @Override
    public void deleteById(long id)
    {
        booksRepository.deleteById(id);
    }

    @Override
    public Optional<Books> findById(long id)
    {
        return booksRepository.findById(id);
    }

    @Override
    public List<Books> findAll()
    {
        return booksRepository.findAll();
    }

    public List<Books> findAllByName(String name)
    {
        return booksRepository.findByNameContaining(name);
    }
}
