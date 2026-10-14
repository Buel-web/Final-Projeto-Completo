package com.MinhaAPi.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "produtos")
public class Produto {

    @Id
    private String id;

    private String nome;
    private Double preco;

    @DBRef
    private Categoria categoria;
}