package com.cb008101.eirlss.lms.mvc.book;

import com.cb008101.eirlss.lms.mvc.book.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
    List<Books> findByNameContaining(String name);
}
