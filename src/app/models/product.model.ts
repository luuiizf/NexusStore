export interface Product {
  id: number
  nome: string
  descricao: string
  preco: number
  categoria: string
  ativo: boolean
  estoque: number
  imagemUrl?: string
  dataCriacao: Date
}

export interface CreateProductDto {
  nome: string
  descricao: string
  preco: number
  categoria: string
  ativo: boolean
  estoque: number
  imagemUrl?: string
}
