package com.cb008101.eirlss.lms.users;


import com.cb008101.eirlss.lms.dto.BooksDto;
import com.cb008101.eirlss.lms.dto.UsersDto;
import com.cb008101.eirlss.lms.dto.VideosDto;
import org.hibernate.Hibernate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("users/")
public class UsersController
{


    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService)
    {
        this.usersService = usersService;
    }

    @PostMapping
    public UsersDto create(@Valid @RequestBody Users userRequest)
    {
        Users user = usersService.save(userRequest);
        return prepareUserDto(user);
    }

    @PostMapping(path = "login/")
    public UsersDto login(@Valid @RequestBody UsersDto usersDto)
    {
        Users user = usersService.findByEmailAndPassword(usersDto.getEmail(), usersDto.getPassword());
        return prepareUserDto(user);
    }

    @PutMapping
    public UsersDto update(@Valid @RequestBody Users userRequest)
    {
        Users user = usersService.save(userRequest);
        return prepareUserDto(user);
    }

    @DeleteMapping(path = "user/{id}")
    public void delete(@PathVariable("id") long id)
    {
        usersService.deleteById(id);
    }

    @GetMapping
    public List<Users> list()
    {
        return usersService.findAll();
    }

    private UsersDto prepareUserDto(Users user)
    {
        Hibernate.initialize(user.getPlan());
        UsersDto response = new UsersDto();
        response.setReservedBooks(user.getBookReservations() == null ? new ArrayList<>() : user.getBookReservations().stream().map(BooksDto::build).collect(Collectors.toList()));
        response.setReservedVideos(user.getVideoReservations() == null ? new ArrayList<>() : user.getVideoReservations().stream().map(VideosDto::build).collect(Collectors.toList()));

        BeanUtils.copyProperties(user, response);
        return response;
    }
}
