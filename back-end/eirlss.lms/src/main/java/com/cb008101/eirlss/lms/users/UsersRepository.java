package com.cb008101.eirlss.lms.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long>
{

    Users findByEmailAndPassword(String email, String password);
}
