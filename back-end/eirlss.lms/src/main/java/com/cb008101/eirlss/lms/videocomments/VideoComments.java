package com.cb008101.eirlss.lms.videocomments;

import com.cb008101.eirlss.lms.dto.CommentDto;
import com.cb008101.eirlss.lms.parents.CommentEntityParent;
import com.cb008101.eirlss.lms.videos.Videos;
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
public class VideoComments extends CommentEntityParent
{

    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false)
    @JsonIgnore
    private Videos video;

    public static VideoComments convert(CommentDto comment)
    {
        VideoComments videoComments = new VideoComments();
        videoComments.setComment(comment.getComment());
        videoComments.setUser(comment.getUser());
        videoComments.setVideo(comment.getVideo());
        videoComments.setCommentDate(comment.getCommentDate());
        return videoComments;
    }
}
