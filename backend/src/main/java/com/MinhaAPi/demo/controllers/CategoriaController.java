package com.MinhaAPi.demo.controllers;

import com.MinhaAPi.demo.entities.Categoria;
import com.MinhaAPi.demo.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> listarTodas() {
        return ResponseEntity.ok(categoriaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(categoriaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.criar(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable String id, @RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.atualizar(id, categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        categoriaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}