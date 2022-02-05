package com.cb008101.eirlss.lms.videos;


import com.cb008101.eirlss.lms.dto.VideosFullDto;
import org.hibernate.Hibernate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("videos/")
public class VideosController
{

    private final VideosService videosService;

    @Autowired
    public VideosController(VideosService videosService)
    {
        this.videosService = videosService;
    }


    @PostMapping
    public Videos create(@Valid @RequestBody Videos video)
    {
        return videosService.save(video);
    }

    @PutMapping
    public Videos update(@Valid @RequestBody Videos video)
    {
        return videosService.save(video);
    }

    @DeleteMapping(path = "video/{id}")
    public void delete(@PathVariable("id") long id)
    {
        videosService.deleteById(id);
    }

    @GetMapping(path = "video/{id}")
    public VideosFullDto get(@PathVariable("id") long id)
    {
        VideosFullDto response = null;
        Optional<Videos> video = videosService.findById(id);
        if (video.isPresent())
        {
            Videos videoEntity = video.get();
            Hibernate.initialize(videoEntity.getCategory());
            Hibernate.initialize(videoEntity.getComments());
            response = new VideosFullDto();
            BeanUtils.copyProperties(videoEntity, response);
        }
        return response;
    }

    @GetMapping
    public List<Videos> list()
    {
        return videosService.findAll();
    }

    @GetMapping(path = "search/{name}")
    public List<Videos> search(@PathVariable("name") String name)
    {
        return videosService.findAllByName(name);
    }
}
