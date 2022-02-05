package com.cb008101.eirlss.lms.bookreservations;


import com.cb008101.eirlss.lms.dto.BookReservationsDto;
import com.cb008101.eirlss.lms.users.Users;
import com.cb008101.eirlss.lms.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("book/reservations/")
public class BooksReservationsController
{

    private final BooksReservationsService booksReservationsService;
    private final UsersService usersService;

    @Autowired
    public BooksReservationsController(BooksReservationsService booksReservationsService,
                                       UsersService usersService)
    {
        this.booksReservationsService = booksReservationsService;
        this.usersService = usersService;
    }


    @PostMapping
    public BookReservations create(@Valid @RequestBody BookReservationsDto reservation)
    {
        return booksReservationsService.save(BookReservationsDto.build(reservation));
    }

    @PutMapping
    public BookReservations update(@Valid @RequestBody BookReservationsDto reservation)
    {
        return booksReservationsService.save(BookReservationsDto.build(reservation));
    }

    @DeleteMapping(path = "reservation/{id}")
    public void delete(@PathVariable("id") long id)
    {
        booksReservationsService.deleteById(id);
    }

    @GetMapping
    public List<BookReservationsDto> list()
    {
        return booksReservationsService.findAll().stream().map(BookReservationsDto::build).collect(Collectors.toList());
    }

    @GetMapping("user/{id}")
    public List<BookReservationsDto> list(@PathVariable("id") long id)
    {
        Optional<Users> user = usersService.findById(id);
        return user.isPresent() ? user.get().getBookReservations().stream().map(BookReservationsDto::build).collect(Collectors.toList()) : null;
    }
}
