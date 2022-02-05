package com.cb008101.eirlss.lms.parents;


import com.cb008101.eirlss.lms.users.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@MappedSuperclass
public class CommentEntityParent
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Lob
    @Column(length = 512, nullable = false)
    private String comment;

    @Column(nullable = false)
    private LocalDateTime commentDate = LocalDateTime.now();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private Users user;

    @Column(nullable = false)
    @ColumnDefault("0")
    private boolean hidden = false;

}
