package com.cb008101.eirlss.lms.mvc.videocomment;

import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoCommentsService implements CrudRepository<VideoComments> {

    private VideoCommentsRepository videoCommentsRepository;

    @Autowired
    public VideoCommentsService(VideoCommentsRepository videoCommentsRepository) {
        this.videoCommentsRepository = videoCommentsRepository;
    }

    @Override
    public VideoComments save(VideoComments comment){
        return videoCommentsRepository.save(comment);
    }
    @Override
    public void deleteById(long id){ videoCommentsRepository.deleteById(id); }
    @Override
    public List<VideoComments> findAll(){
        return videoCommentsRepository.findAll();
    }
    @Override
    public Optional<VideoComments> findById(long id){ return videoCommentsRepository.findById(id); }
}
