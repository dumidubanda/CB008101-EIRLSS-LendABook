package com.cb008101.eirlss.lms.videos;


import com.cb008101.eirlss.lms.parents.ProductEntityParent;
import com.cb008101.eirlss.lms.videocategory.VideoCategories;
import com.cb008101.eirlss.lms.videocomments.VideoComments;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Entity
@Setter
@Getter
@NoArgsConstructor
public class Videos extends ProductEntityParent
{

    @Column
    int watchingAge;
    @Column(nullable = false)
    private String director;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private long duration;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "category_id", nullable = false)
    private VideoCategories category;

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<VideoComments> comments;

}
