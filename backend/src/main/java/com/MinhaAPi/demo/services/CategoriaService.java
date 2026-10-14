package com.MinhaAPi.demo.services;
import com.MinhaAPi.demo.entities.Categoria;
import com.MinhaAPi.demo.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(String id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    public Categoria criar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria atualizar(String id, Categoria categoriaAtualizada) {
        Categoria categoria = buscarPorId(id);
        categoria.setNome(categoriaAtualizada.getNome());
        return categoriaRepository.save(categoria);
    }

    public void deletar(String id) {
        categoriaRepository.deleteById(id);
    }
}
