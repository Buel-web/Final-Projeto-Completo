package com.MinhaAPi.demo.repositories;

import com.MinhaAPi.demo.entities.Categoria;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoriaRepository extends MongoRepository<Categoria, String> {
}