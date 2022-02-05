package com.cb008101.eirlss.lms.videoreservations;


import com.cb008101.eirlss.lms.dto.VideoReservationsDto;
import com.cb008101.eirlss.lms.users.Users;
import com.cb008101.eirlss.lms.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("video/reservations/")
public class VideosReservationsController
{

    private final VideosReservationsService videosReservationsService;
    private final UsersService usersService;

    @Autowired
    public VideosReservationsController(VideosReservationsService videosReservationsService,
                                        UsersService usersService)
    {
        this.videosReservationsService = videosReservationsService;
        this.usersService = usersService;
    }


    @PostMapping
    public VideoReservations create(@Valid @RequestBody VideoReservationsDto reservation)
    {
        return videosReservationsService.save(VideoReservationsDto.build(reservation));
    }

    @PutMapping
    public VideoReservations update(@Valid @RequestBody VideoReservationsDto reservation)
    {
        return videosReservationsService.save(VideoReservationsDto.build(reservation));
    }

    @DeleteMapping(path = "reservation/{id}")
    public void delete(@PathVariable("id") long id)
    {
        videosReservationsService.deleteById(id);
    }

    @GetMapping
    public List<VideoReservationsDto> list()
    {
        return videosReservationsService.findAll().stream().map(VideoReservationsDto::build).collect(Collectors.toList());
    }

    @GetMapping("user/{id}")
    public List<VideoReservationsDto> list(@PathVariable("id") long id)
    {
        Optional<Users> user = usersService.findById(id);
        return user.isPresent() ? user.get().getVideoReservations().stream().map(VideoReservationsDto::build).collect(Collectors.toList()) : null;
    }
}
