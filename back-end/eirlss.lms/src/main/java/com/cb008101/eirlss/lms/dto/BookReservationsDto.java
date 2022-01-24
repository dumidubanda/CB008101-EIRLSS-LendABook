package com.cb008101.eirlss.lms.dto;


import com.cb008101.eirlss.lms.mvc.bookreservation.BookReservations;
import com.cb008101.eirlss.lms.mvc.book.Books;
import com.cb008101.eirlss.lms.mvc.users.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookReservationsDto {
    private Long id;
    private BooksDto book;
    private Users user;
    private LocalDateTime reservationDate;

    public static BookReservations build(BookReservationsDto reservationsDto){
        BookReservations reservations = new BookReservations();
        Books book = new Books();
        book.setId(reservationsDto.getBook().getId());
        reservations.setBook(book);
        reservations.setUser(reservationsDto.getUser());
        reservations.setReservationDate(reservationsDto.getReservationDate());
        return reservations;
    }
    public static BookReservationsDto build(BookReservations reservations){
        BookReservationsDto reservationsDto = new BookReservationsDto();
        reservationsDto.setId(reservations.getId());
        reservationsDto.setBook(BooksDto.build(reservations));
        reservationsDto.setUser(reservations.getUser());
        reservationsDto.setReservationDate(reservations.getReservationDate());
        return reservationsDto;
    }
}
