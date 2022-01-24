package com.cb008101.eirlss.lms.mvc.plans;

import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlansService implements CrudRepository<Plans> {

    private PlansRepository plansRepository;

    @Autowired
    public PlansService(PlansRepository plansRepository) {
        this.plansRepository = plansRepository;
    }

    @Override
    public Plans save(Plans plan){
        return plansRepository.save(plan);
    }
    @Override
    public void deleteById(long id){
        plansRepository.deleteById(id);
    }
    @Override
    public List<Plans> findAll(){
        return plansRepository.findAll();
    }
    @Override
    public Optional<Plans> findById(long id){ return plansRepository.findById(id); }
}
