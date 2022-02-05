package com.cb008101.eirlss.lms.dto;

import com.cb008101.eirlss.lms.bookreservations.BookReservations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BooksDto implements Serializable
{
    private Long id;
    private String name;


    public static BooksDto build(BookReservations bookReservations)
    {
        return new BooksDto(bookReservations.getBook().getId(),
                bookReservations.getBook().getName());
    }
}
