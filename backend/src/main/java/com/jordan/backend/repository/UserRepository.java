package com.jordan.backend.repository;

import com.jordan.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {

    boolean existsByEmail(String email);

}
