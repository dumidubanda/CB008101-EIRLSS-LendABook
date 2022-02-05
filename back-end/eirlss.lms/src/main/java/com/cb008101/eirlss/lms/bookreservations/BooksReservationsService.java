package com.cb008101.eirlss.lms.bookreservations;


import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BooksReservationsService implements CrudRepository<BookReservations>
{

    private final BooksReservationsRepository booksReservationsRepository;

    @Autowired
    public BooksReservationsService(BooksReservationsRepository booksReservationsRepository)
    {
        this.booksReservationsRepository = booksReservationsRepository;
    }

    @Override
    public BookReservations save(BookReservations reservation)
    {
        return booksReservationsRepository.save(reservation);
    }

    @Override
    public void deleteById(long id)
    {
        booksReservationsRepository.deleteById(id);
    }

    @Override
    public List<BookReservations> findAll()
    {
        return booksReservationsRepository.findAll();
    }

    @Override
    public Optional<BookReservations> findById(long id)
    {
        return booksReservationsRepository.findById(id);
    }
}
