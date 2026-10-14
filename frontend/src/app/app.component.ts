import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria, Produto } from './models';
import { CategoriaService } from './categoria.service';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  template: `
    <main>
      <h1>🛒 Produtos e Categorias</h1>
      @if (erro()) { <p class="erro">{{ erro() }}</p> }

      <section>
        <h2>Categorias</h2>
        <form [formGroup]="formCategoria" (ngSubmit)="salvarCategoria()">
          <input formControlName="nome" placeholder="Nome da categoria">
          <div class="acoes">
            <button type="submit" [disabled]="formCategoria.invalid">
              {{ editandoCategoriaId() ? 'Atualizar' : 'Adicionar' }}
            </button>
            @if (editandoCategoriaId()) {
              <button type="button" class="sec" (click)="cancelarCategoria()">Cancelar</button>
            }
          </div>
        </form>
        <ul>
          @for (c of categorias(); track c.id) {
            <li>
              <strong>{{ c.nome }}</strong>
              <div class="acoes">
                <button class="sec" (click)="editarCategoria(c)">Editar</button>
                <button class="perigo" (click)="excluirCategoria(c)">Excluir</button>
              </div>
            </li>
          } @empty {
            <li>Nenhuma categoria cadastrada.</li>
          }
        </ul>
      </section>

      <section>
        <h2>Produtos</h2>
        <form [formGroup]="formProduto" (ngSubmit)="salvarProduto()">
          <input formControlName="nome" placeholder="Nome do produto">
          <input formControlName="preco" type="number" step="0.01" min="0" placeholder="Preço">
          <select formControlName="categoriaId">
            <option value="">Sem categoria</option>
            @for (c of categorias(); track c.id) {
              <option [value]="c.id">{{ c.nome }}</option>
            }
          </select>
          <div class="acoes">
            <button type="submit" [disabled]="formProduto.invalid">
              {{ editandoProdutoId() ? 'Atualizar' : 'Adicionar' }}
            </button>
            @if (editandoProdutoId()) {
              <button type="button" class="sec" (click)="cancelarProduto()">Cancelar</button>
            }
          </div>
        </form>
        <ul>
          @for (p of produtos(); track p.id) {
            <li>
              <div>
                <strong>{{ p.nome }}</strong>
                <small>{{ p.preco | currency:'BRL' }} · {{ p.categoria?.nome ?? 'Sem categoria' }}</small>
              </div>
              <div class="acoes">
                <button class="sec" (click)="editarProduto(p)">Editar</button>
                <button class="perigo" (click)="excluirProduto(p)">Excluir</button>
              </div>
            </li>
          } @empty {
            <li>Nenhum produto cadastrado.</li>
          }
        </ul>
      </section>
    </main>
  `,
  styles: [`
    main { max-width: 680px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; }
    section { margin-bottom: 2rem; }
    form { display: grid; gap: .6rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem; }
    input, select { padding: .5rem; border: 1px solid #ccc; border-radius: 6px; }
    ul { list-style: none; padding: 0; display: grid; gap: .6rem; }
    li { display: flex; justify-content: space-between; align-items: center; padding: .8rem 1rem; border: 1px solid #ddd; border-radius: 8px; }
    li small { display: block; color: #666; }
    .acoes { display: flex; gap: .4rem; }
    button { padding: .45rem .9rem; border: 0; border-radius: 6px; background: #2563eb; color: #fff; cursor: pointer; }
    button:disabled { opacity: .5; cursor: not-allowed; }
    .sec { background: #6b7280; } .perigo { background: #dc2626; }
    .erro { color: #dc2626; }
  `]
})
export class AppComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private produtoService = inject(ProdutoService);
  private fb = inject(FormBuilder);

  categorias = signal<Categoria[]>([]);
  produtos = signal<Produto[]>([]);
  editandoCategoriaId = signal<string | null>(null);
  editandoProdutoId = signal<string | null>(null);
  erro = signal('');

  formCategoria = this.fb.nonNullable.group({
    nome: ['', Validators.required]
  });

  formProduto = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0)]],
    categoriaId: ['']
  });

  ngOnInit() { this.carregarTudo(); }

  carregarTudo() {
    this.carregarCategorias();
    this.carregarProdutos();
  }

  carregarCategorias() {
    this.categoriaService.listar().subscribe({
      next: dados => { this.categorias.set(dados); this.erro.set(''); },
      error: () => this.erro.set('Não foi possível conectar à API (suba o backend na porta 8080).')
    });
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: dados => this.produtos.set(dados),
      error: () => this.erro.set('Não foi possível conectar à API (suba o backend na porta 8080).')
    });
  }

  // ---------- Categorias ----------
  salvarCategoria() {
    const categoria: Categoria = this.formCategoria.getRawValue();
    const id = this.editandoCategoriaId();
    const req = id ? this.categoriaService.atualizar(id, categoria) : this.categoriaService.criar(categoria);
    req.subscribe({
      next: () => { this.cancelarCategoria(); this.carregarTudo(); },
      error: () => this.erro.set('Erro ao salvar a categoria.')
    });
  }

  editarCategoria(c: Categoria) {
    this.editandoCategoriaId.set(c.id!);
    this.formCategoria.setValue({ nome: c.nome });
  }

  cancelarCategoria() {
    this.editandoCategoriaId.set(null);
    this.formCategoria.reset({ nome: '' });
  }

  excluirCategoria(c: Categoria) {
    if (!confirm(`Excluir a categoria "${c.nome}"?`)) return;
    this.categoriaService.excluir(c.id!).subscribe({
      next: () => this.carregarTudo(),
      error: () => this.erro.set('Erro ao excluir a categoria.')
    });
  }

  // ---------- Produtos ----------
  salvarProduto() {
    const { nome, preco, categoriaId } = this.formProduto.getRawValue();
    const categoria = this.categorias().find(c => c.id === categoriaId) ?? null;
    const produto: Produto = { nome, preco: Number(preco), categoria };
    const id = this.editandoProdutoId();
    const req = id ? this.produtoService.atualizar(id, produto) : this.produtoService.criar(produto);
    req.subscribe({
      next: () => { this.cancelarProduto(); this.carregarProdutos(); },
      error: () => this.erro.set('Erro ao salvar o produto.')
    });
  }

  editarProduto(p: Produto) {
    this.editandoProdutoId.set(p.id!);
    this.formProduto.setValue({ nome: p.nome, preco: p.preco, categoriaId: p.categoria?.id ?? '' });
  }

  cancelarProduto() {
    this.editandoProdutoId.set(null);
    this.formProduto.reset({ nome: '', preco: 0, categoriaId: '' });
  }

  excluirProduto(p: Produto) {
    if (!confirm(`Excluir o produto "${p.nome}"?`)) return;
    this.produtoService.excluir(p.id!).subscribe({
      next: () => this.carregarProdutos(),
      error: () => this.erro.set('Erro ao excluir o produto.')
    });
  }
}
