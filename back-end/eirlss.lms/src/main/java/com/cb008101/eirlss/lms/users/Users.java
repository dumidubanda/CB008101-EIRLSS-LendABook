package com.cb008101.eirlss.lms.users;

import com.cb008101.eirlss.lms.bookreservations.BookReservations;
import com.cb008101.eirlss.lms.enums.UserStatusEnum;
import com.cb008101.eirlss.lms.plans.Plans;
import com.cb008101.eirlss.lms.videoreservations.VideoReservations;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;


@Entity
@Setter
@Getter
@NoArgsConstructor
public class Users
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @ColumnDefault("0")
    private boolean isAdmin = false;

    @Column(nullable = false)
    @ColumnDefault("1")
    private UserStatusEnum status = UserStatusEnum.ACTIVE;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "plan_id", nullable = false)
    private Plans plan;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@JsonManagedReference
    private List<BookReservations> bookReservations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@JsonManagedReference
    private List<VideoReservations> videoReservations;
}
