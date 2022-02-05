package com.cb008101.eirlss.lms.bookreservations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksReservationsRepository extends JpaRepository<BookReservations, Long>
{
}
