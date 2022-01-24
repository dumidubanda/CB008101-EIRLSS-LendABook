package com.cb008101.eirlss.lms.users;

import com.cb008101.eirlss.lms.mvc.bookreservation.BookReservations;
import com.cb008101.eirlss.lms.mvc.users.Users;
import com.cb008101.eirlss.lms.mvc.users.UsersRepository;
import org.apache.catalina.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static com.cb008101.eirlss.lms.enums.UserStatusEnum.ACTIVE;
import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
public class UsersRepositoryTest
{

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private BookReservations bookReservation;

    @Test
    void saveUserTest() {
        Users users = new Users();
        users.setAdmin(false);
        users.setFirstName("user");
        users.setLastName("ten");
        users.setEmail("userten@gmail.com");
        users.setPassword("123456");
        users.setStatus(ACTIVE);
       // users.setBookReservations( List<BookReservations> bookReservation);

        usersRepository.save(users);
        Assertions.assertThat(users.getId()).isGreaterThan(0);
    }



//    @Test
//    void testUserByName() {
//        Optional<Users> users = usersRepository.findByEmailAndPassword("test@gmail.com", "test");
//
//    }
}
