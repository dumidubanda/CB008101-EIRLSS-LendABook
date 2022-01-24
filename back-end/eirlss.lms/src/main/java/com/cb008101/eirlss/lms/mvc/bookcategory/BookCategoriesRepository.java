package com.cb008101.eirlss.lms.mvc.bookcategory;

import com.cb008101.eirlss.lms.mvc.bookcategory.BookCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCategoriesRepository extends JpaRepository<BookCategories, Long> {
}
