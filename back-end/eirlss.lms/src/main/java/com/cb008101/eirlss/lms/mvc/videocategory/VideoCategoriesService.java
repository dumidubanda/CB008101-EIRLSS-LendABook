package com.cb008101.eirlss.lms.mvc.videocategory;

import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class VideoCategoriesService implements CrudRepository<VideoCategories> {

    private VideoCategoriesRepository videoCategoriesRepository;

    @Autowired
    public VideoCategoriesService( VideoCategoriesRepository videoCategoriesRepository) {
        this.videoCategoriesRepository = videoCategoriesRepository;
    }

    @Override
    public VideoCategories save(VideoCategories category){
        return videoCategoriesRepository.save(category);
    }
    @Override
    public void deleteById(long id){
        videoCategoriesRepository.deleteById(id);
    }
    @Override
    public List<VideoCategories> findAll(){
        return videoCategoriesRepository.findAll();
    }
    @Override
    public Optional<VideoCategories> findById(long id){ return videoCategoriesRepository.findById(id); }
}
