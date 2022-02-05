package com.cb008101.eirlss.lms.videos;


import com.cb008101.eirlss.lms.videocategory.VideoCategories;
import com.cb008101.eirlss.lms.videocategory.VideoCategoriesRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class VideoCategoryRepositoryTest
{
    @Autowired
    private VideoCategoriesRepository videoCategoriesRepository;

    @Test
    void testSaveVideoCategory()
    {
        VideoCategories category = new VideoCategories();
        category.setName("Thriller");

        videoCategoriesRepository.save(category);
        //Assertions.assertThat(employee.getId()).isEqualTo(27);
        Assertions.assertThat(category.getId()).isGreaterThan(0);
    }

    @Test
    void getAllVideoCategoriesTest() {
        List<VideoCategories> category = (List<VideoCategories>) videoCategoriesRepository.findAll();
        System.out.println("\nSize : "+category.size());
        assertThat(category.size()).isGreaterThan(0);
    }
}
