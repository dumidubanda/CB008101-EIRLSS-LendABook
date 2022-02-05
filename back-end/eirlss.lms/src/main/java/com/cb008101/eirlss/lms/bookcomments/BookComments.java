package com.cb008101.eirlss.lms.bookcomments;

import com.cb008101.eirlss.lms.books.Books;
import com.cb008101.eirlss.lms.dto.CommentDto;
import com.cb008101.eirlss.lms.parents.CommentEntityParent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class BookComments extends CommentEntityParent
{

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    @JsonIgnore
    private Books book;

    public static BookComments convert(CommentDto comment)
    {
        BookComments bookComments = new BookComments();
        bookComments.setComment(comment.getComment());
        bookComments.setUser(comment.getUser());
        bookComments.setBook(comment.getBook());
        bookComments.setCommentDate(comment.getCommentDate());
        return bookComments;
    }
}
