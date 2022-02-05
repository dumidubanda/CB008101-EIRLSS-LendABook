package com.cb008101.eirlss.lms.videoreservations;


import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideosReservationsService implements CrudRepository<VideoReservations>
{

    private final VideosReservationsRepository videosReservationsRepository;

    @Autowired
    public VideosReservationsService(VideosReservationsRepository videosReservationsRepository)
    {
        this.videosReservationsRepository = videosReservationsRepository;
    }

    @Override
    public VideoReservations save(VideoReservations reservation)
    {
        return videosReservationsRepository.save(reservation);
    }

    @Override
    public void deleteById(long id)
    {
        videosReservationsRepository.deleteById(id);
    }

    @Override
    public List<VideoReservations> findAll()
    {
        return videosReservationsRepository.findAll();
    }

    @Override
    public Optional<VideoReservations> findById(long id)
    {
        return videosReservationsRepository.findById(id);
    }
}
