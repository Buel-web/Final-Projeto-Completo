package com.MinhaAPi.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "categorias")
public class Categoria {

    @Id
    private String id;

    private String nome;
}