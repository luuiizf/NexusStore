export interface Product {
  id: number
  nome: string
  descricao: string
  preco: number
  categoria: string
  estoque: number
  ativo: boolean
  imagem_url?: string
  data_criacao: string
  data_atualizacao: string
  valor_total_estoque?: number
  status_estoque?: string
}

export interface CreateProductDto {
  nome: string
  descricao: string
  preco: number
  categoria: string
  estoque: number
  ativo: boolean
  imagem_url?: string
}

export interface ProductStats {
  total_produtos: number
  produtos_ativos: number
  produtos_inativos: number
  estoque_baixo: number
  valor_total_estoque: number
  por_categoria: Array<{
    categoria: string
    total: number
    ativos: number
  }>
}

export interface ApiResponse<T> {
  count?: number
  next?: string
  previous?: string
  results?: T[]
}
