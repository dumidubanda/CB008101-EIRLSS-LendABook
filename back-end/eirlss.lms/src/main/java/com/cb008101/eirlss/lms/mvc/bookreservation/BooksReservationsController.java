package com.cb008101.eirlss.lms.mvc.bookreservation;


import com.cb008101.eirlss.lms.dto.BookReservationsDto;
import com.cb008101.eirlss.lms.mvc.users.Users;
import com.cb008101.eirlss.lms.mvc.users.UsersService;
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

    private BooksReservationsService booksReservationsService;
    private UsersService usersService;

    @Autowired
    public BooksReservationsController(BooksReservationsService booksReservationsService,
                                       UsersService usersService) {
        this.booksReservationsService = booksReservationsService;
        this.usersService = usersService;
    }


    @PostMapping
    public BookReservations create(@Valid  @RequestBody BookReservationsDto reservation){
        return booksReservationsService.save(BookReservationsDto.build(reservation));
    }

    @PutMapping
    public BookReservations update(@Valid  @RequestBody BookReservationsDto reservation){
        return booksReservationsService.save(BookReservationsDto.build(reservation));
    }

    @DeleteMapping(path = "reservation/{id}")
    public void delete(@PathVariable("id") long id){ booksReservationsService.deleteById(id); }

    @GetMapping
    public List<BookReservationsDto> list(){
        return booksReservationsService.findAll().stream().map(BookReservationsDto::build).collect(Collectors.toList());
    }

    @GetMapping("user/{id}")
    public List<BookReservationsDto> list(@PathVariable("id")  long id){
        Optional<Users> user = usersService.findById(id);
        return user.isPresent() ? user.get().getBookReservations().stream().map(BookReservationsDto::build).collect(Collectors.toList()) : null;
    }
}
