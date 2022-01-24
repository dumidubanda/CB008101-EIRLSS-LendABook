package com.cb008101.eirlss.lms.dto;

import com.cb008101.eirlss.lms.mvc.bookreservation.BookReservations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BooksDto{
    private Long id;
    private String name;


    public static BooksDto build(BookReservations bookReservations){
        return new BooksDto(bookReservations.getBook().getId(),
                bookReservations.getBook().getName());
    }
}
