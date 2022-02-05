package com.cb008101.eirlss.lms.videos;


import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideosService implements CrudRepository<Videos>
{


    private final VideosRepository videosRepository;

    @Autowired
    public VideosService(VideosRepository videosRepository)
    {
        this.videosRepository = videosRepository;
    }

    @Override
    public Videos save(Videos video)
    {
        return videosRepository.save(video);
    }

    @Override
    public void deleteById(long id)
    {
        videosRepository.deleteById(id);
    }

    @Override
    public Optional<Videos> findById(long id)
    {
        return videosRepository.findById(id);
    }

    @Override
    public List<Videos> findAll()
    {
        return videosRepository.findAll();
    }


    public List<Videos> findAllByName(String name)
    {
        return videosRepository.findByNameContaining(name);
    }

}
