package com.cb008101.eirlss.lms.bookreservations;


import com.cb008101.eirlss.lms.books.Books;
import com.cb008101.eirlss.lms.parents.ReservationEntityParent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class BookReservations extends ReservationEntityParent
{

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id", nullable = false)
    @JsonIgnore
    private Books book;
}
