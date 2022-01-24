package com.cb008101.eirlss.lms.dto;

import com.cb008101.eirlss.lms.mvc.plans.Plans;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class UsersDto {

    private Long id;
    private String firstName;
    private String lastName;
    @Email
    private String email;
    private String password;
    private boolean isAdmin = false;
    private Plans plan;
    private List<BooksDto> reservedBooks;
    private List<VideosDto> reservedVideos;
}
