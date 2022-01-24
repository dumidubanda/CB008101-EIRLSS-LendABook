package com.cb008101.eirlss.lms.dto;

import com.cb008101.eirlss.lms.mvc.book.Books;
import com.cb008101.eirlss.lms.mvc.users.Users;
import com.cb008101.eirlss.lms.mvc.video.Videos;
import com.cb008101.eirlss.lms.parents.CommentEntityParent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String comment;
    private LocalDateTime commentDate;
    private Books book;
    private Users user;
    private Videos video;

    public static CommentDto build(CommentEntityParent commentEntityParent){
        CommentDto commentDto = new CommentDto();
        commentDto.setId(commentEntityParent.getId());
        commentDto.setComment(commentEntityParent.getComment());
        commentDto.setCommentDate(commentEntityParent.getCommentDate());
        commentDto.setFirstName(commentEntityParent.getUser().getFirstName());
        commentDto.setLastName(commentEntityParent.getUser().getLastName());
        commentDto.setUserId(commentEntityParent.getUser().getId());
        return commentDto;
    }
}
