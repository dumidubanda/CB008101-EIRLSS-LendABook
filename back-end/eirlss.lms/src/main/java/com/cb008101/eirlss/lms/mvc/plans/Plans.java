package com.cb008101.eirlss.lms.mvc.plans;

import com.cb008101.eirlss.lms.mvc.users.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.util.List;


@Entity
@Setter
@Getter
@NoArgsConstructor
public class Plans {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    @Min(1)
    private int books;

    @Column
    @Min(1)
    private int videos;

    @Column
    @Min(1)
    private int bookLendDuration;

    @Column
    @Min(1)
    private int videokLendDuration;

    @Column
    @Min(1)
    private int bookLendCharges;

    @Column
    @Min(1)
    private int videoLendCharges;

    @Column
    @Min(1)
    private int annualMembershipFee;

    @Column
    @Min(1)
    private int overdueCharges;

    @JsonIgnore
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Users> users;

}
