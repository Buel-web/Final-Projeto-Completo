package com.MinhaAPi.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

/**
 * Transforma as RuntimeException dos services em respostas 404 com mensagem,
 * em vez de um erro 500 generico.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> naoEncontrado(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erro", e.getMessage() == null ? "Recurso nao encontrado" : e.getMessage()));
    }
}
