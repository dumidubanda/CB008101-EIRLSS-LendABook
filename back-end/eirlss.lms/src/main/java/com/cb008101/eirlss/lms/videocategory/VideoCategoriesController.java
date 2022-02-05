package com.cb008101.eirlss.lms.videocategory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("video/categories/")
public class VideoCategoriesController
{

    private final VideoCategoriesService videoCategoriesService;

    @Autowired
    public VideoCategoriesController(VideoCategoriesService videoCategoriesService)
    {
        this.videoCategoriesService = videoCategoriesService;
    }


    @PostMapping
    public VideoCategories create(@Valid @RequestBody VideoCategories category)
    {
        return videoCategoriesService.save(category);
    }

    @PutMapping
    public VideoCategories update(@Valid @RequestBody VideoCategories category)
    {
        return videoCategoriesService.save(category);
    }

    @DeleteMapping(path = "category/{id}")
    public void delete(@PathVariable("id") long id)
    {
        videoCategoriesService.deleteById(id);
    }

    @GetMapping
    public List<VideoCategories> list()
    {
        return videoCategoriesService.findAll();
    }

}
