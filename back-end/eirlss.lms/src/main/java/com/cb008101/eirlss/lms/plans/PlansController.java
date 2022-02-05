package com.cb008101.eirlss.lms.plans;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("plans/")
public class PlansController
{

    private final PlansService plansService;

    @Autowired
    public PlansController(PlansService plansService)
    {
        this.plansService = plansService;
    }


    @PostMapping
    public Plans save(@Valid @RequestBody Plans plan)
    {
        return plansService.save(plan);
    }

    @PutMapping
    public Plans update(@Valid @RequestBody Plans plan)
    {
        return plansService.save(plan);
    }

    @DeleteMapping(path = "plan/{id}")
    public void delete(@PathVariable("id") long id)
    {
        plansService.deleteById(id);
    }

    @GetMapping
    public List<Plans> list()
    {
        return plansService.findAll();
    }
}
