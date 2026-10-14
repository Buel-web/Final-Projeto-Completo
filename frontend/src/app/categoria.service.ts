import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';
import { Categoria } from './models';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly url = `${API_URL}/categorias`;

  listar(): Observable<Categoria[]> {                          // GET /categorias
    return this.http.get<Categoria[]>(this.url);
  }
  buscarPorId(id: string): Observable<Categoria> {             // GET /categorias/{id}
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }
  criar(c: Categoria): Observable<Categoria> {                 // POST /categorias
    return this.http.post<Categoria>(this.url, c);
  }
  atualizar(id: string, c: Categoria): Observable<Categoria> { // PUT /categorias/{id}
    return this.http.put<Categoria>(`${this.url}/${id}`, c);
  }
  excluir(id: string): Observable<void> {                      // DELETE /categorias/{id}
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
