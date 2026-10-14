export interface Categoria {
  id?: string;
  nome: string;
}

export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  categoria: Categoria | null;
}
