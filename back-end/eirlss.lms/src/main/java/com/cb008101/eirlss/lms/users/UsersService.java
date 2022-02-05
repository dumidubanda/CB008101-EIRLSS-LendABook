package com.cb008101.eirlss.lms.users;


import com.cb008101.eirlss.lms.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService implements CrudRepository<Users>
{

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository)
    {
        this.usersRepository = usersRepository;
    }

    @Override
    public Users save(Users user)
    {
        return usersRepository.save(user);
    }

    @Override
    public void deleteById(long id)
    {
        usersRepository.deleteById(id);
    }

    @Override
    public Optional<Users> findById(long id)
    {
        return usersRepository.findById(id);
    }

    @Override
    public List<Users> findAll()
    {
        return usersRepository.findAll();
    }


    public Users findByEmailAndPassword(String email, String password)
    {
        return usersRepository.findByEmailAndPassword(email, password);
    }
}
