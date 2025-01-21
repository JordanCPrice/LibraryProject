package com.jordan.backend.repository;

import com.jordan.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends MongoRepository<User,String> {

    User findByEmailAndPassword(String email, String Password);
}
