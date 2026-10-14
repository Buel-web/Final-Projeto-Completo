package com.MinhaAPi.demo.repositories;

import com.MinhaAPi.demo.entities.Produto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProdutoRepository extends MongoRepository<Produto, String> {
}