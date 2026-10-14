import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';
import { Produto } from './models';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private http = inject(HttpClient);
  private readonly url = `${API_URL}/produtos`;

  listar(): Observable<Produto[]> {                          // GET /produtos
    return this.http.get<Produto[]>(this.url);
  }
  buscarPorId(id: string): Observable<Produto> {             // GET /produtos/{id}
    return this.http.get<Produto>(`${this.url}/${id}`);
  }
  criar(p: Produto): Observable<Produto> {                   // POST /produtos
    return this.http.post<Produto>(this.url, p);
  }
  atualizar(id: string, p: Produto): Observable<Produto> {   // PUT /produtos/{id}
    return this.http.put<Produto>(`${this.url}/${id}`, p);
  }
  excluir(id: string): Observable<void> {                    // DELETE /produtos/{id}
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
