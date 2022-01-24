package com.cb008101.eirlss.lms.mvc.bookreservation;

import com.cb008101.eirlss.lms.mvc.bookreservation.BookReservations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksReservationsRepository extends JpaRepository<BookReservations, Long> {
}
