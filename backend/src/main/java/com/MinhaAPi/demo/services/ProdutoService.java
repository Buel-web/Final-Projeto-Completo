package com.MinhaAPi.demo.services;


import com.MinhaAPi.demo.entities.Produto;
import com.MinhaAPi.demo.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(String id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public Produto criar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizar(String id, Produto produtoAtualizado) {
        Produto produto = buscarPorId(id);
        produto.setNome(produtoAtualizado.getNome());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setCategoria(produtoAtualizado.getCategoria());
        return produtoRepository.save(produto);
    }

    public void deletar(String id) {
        produtoRepository.deleteById(id);
    }
}