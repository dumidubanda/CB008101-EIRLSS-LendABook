package com.cb008101.eirlss.lms.dto;


import com.cb008101.eirlss.lms.books.Books;
import com.cb008101.eirlss.lms.parents.CommentEntityParent;
import com.cb008101.eirlss.lms.users.Users;
import com.cb008101.eirlss.lms.videos.Videos;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class CommentDto implements Serializable
{
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String comment;
    private LocalDateTime commentDate;
    private Books book;
    private Users user;
    private Videos video;

    public static CommentDto build(CommentEntityParent commentEntityParent)
    {
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
