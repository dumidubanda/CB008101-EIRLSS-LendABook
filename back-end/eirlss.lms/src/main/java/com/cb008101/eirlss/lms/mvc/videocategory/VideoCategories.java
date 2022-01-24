package com.cb008101.eirlss.lms.mvc.videocategory;

import com.cb008101.eirlss.lms.mvc.video.Videos;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.cb008101.eirlss.lms.parents.CategoryEntityParent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;


@Entity
@Setter
@Getter
@NoArgsConstructor
public class VideoCategories extends CategoryEntityParent {

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Videos> videos;
}
