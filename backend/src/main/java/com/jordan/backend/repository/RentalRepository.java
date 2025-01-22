package com.jordan.backend.repository;

import com.jordan.backend.model.Rental;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends MongoRepository<Rental, String> {

    Rental findByUserIdAndBookId(String userId, String bookId);

    List<Rental> findByUserId(String userId);

}
