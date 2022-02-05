package com.cb008101.eirlss.lms.videocomments;


import com.cb008101.eirlss.lms.dto.CommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("video/comments/")
public class VideoCommentsController
{

    private final VideoCommentsService videoCommentsService;

    @Autowired
    public VideoCommentsController(VideoCommentsService videoCommentsService)
    {
        this.videoCommentsService = videoCommentsService;
    }


    @PostMapping
    public CommentDto create(@Valid @RequestBody CommentDto comment)
    {
        return CommentDto.build(videoCommentsService.save(VideoComments.convert(comment)));
    }

    @PutMapping
    public CommentDto update(@Valid @RequestBody CommentDto comment)
    {
        return CommentDto.build(videoCommentsService.save(VideoComments.convert(comment)));
    }

    @DeleteMapping(path = "comment/{id}")
    public void delete(@PathVariable("id") long id)
    {
        videoCommentsService.deleteById(id);
    }
}
