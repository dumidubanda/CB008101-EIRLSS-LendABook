package com.cb008101.eirlss.lms;

import java.util.List;
import java.util.Optional;

public interface CrudRepository<T> {
    T save(T t);
    void deleteById(long id);
    Optional<T> findById(long id);
    List<T> findAll();
}
