package com.cb008101.eirlss.lms.mvc.bookcomment;

import com.cb008101.eirlss.lms.mvc.bookcomment.BookComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCommentsRepository extends JpaRepository<BookComments, Long> {
}
