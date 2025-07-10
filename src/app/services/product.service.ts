import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { BehaviorSubject, type Observable, of, throwError } from "rxjs"
import { catchError, tap, map } from "rxjs/operators"
import type { Product, CreateProductDto } from "../models/product.model"

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly apiUrl = "http://localhost:3000/api/products"

  private products: Product[] = []
  private productsSubject = new BehaviorSubject<Product[]>([])

  constructor(private http: HttpClient) {
    this.loadInitialData()
  }

  private loadInitialData() {
    this.products = [
      {
        id: 1,
        nome: "iPhone 13 Pro",
        descricao:
          "Smartphone Apple com tela Super Retina XDR de 6,1 polegadas, chip A15 Bionic e sistema de câmera Pro com teleobjetiva, grande-angular e ultra-angular.",
        preco: 3999.99,
        categoria: "Eletrônicos",
        ativo: true,
        estoque: 15,
        imagemUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
        dataCriacao: new Date("2024-01-15"),
      },
      {
        id: 2,
        nome: "Notebook Gamer Ultra",
        descricao:
          "Notebook para jogos com placa de vídeo RTX 4060, processador Intel i7, 16GB RAM DDR4 e SSD 512GB NVMe.",
        preco: 4999.99,
        categoria: "Informática",
        ativo: true,
        estoque: 8,
        imagemUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
        dataCriacao: new Date("2024-02-10"),
      },
      {
        id: 3,
        nome: "Fone Bluetooth Premium",
        descricao:
          "Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de 30 horas e qualidade de áudio Hi-Fi.",
        preco: 899.99,
        categoria: "Áudio",
        ativo: false,
        estoque: 0,
        imagemUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        dataCriacao: new Date("2024-01-20"),
      },
      {
        id: 4,
        nome: 'Smart TV 55" 4K',
        descricao:
          "Smart TV LED 55 polegadas com resolução 4K Ultra HD, HDR10+ e sistema operacional Android TV com acesso a apps.",
        preco: 2199.99,
        categoria: "Eletrônicos",
        ativo: true,
        estoque: 12,
        imagemUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
        dataCriacao: new Date("2024-03-05"),
      },
      {
        id: 5,
        nome: "Mouse Gamer RGB",
        descricao:
          "Mouse gamer com sensor óptico de alta precisão, 7 botões programáveis e iluminação RGB personalizável.",
        preco: 299.99,
        categoria: "Informática",
        ativo: true,
        estoque: 25,
        imagemUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
        dataCriacao: new Date("2024-03-10"),
      },
    ]
    this.productsSubject.next([...this.products])
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap((products) => {
        this.products = products
        this.productsSubject.next([...products])
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn("Erro ao buscar produtos do servidor, usando dados locais:", error.message)
        this.productsSubject.next([...this.products])
        return this.productsSubject.asObservable()
      }),
    )
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.warn(`Erro ao buscar produto ${id} do servidor, usando dados locais:`, error.message)
        const product = this.products.find((p) => p.id === id)
        return of(product)
      }),
    )
  }

  createProduct(productDto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productDto).pipe(
      tap((newProduct) => {
        this.products.push(newProduct)
        this.productsSubject.next([...this.products])
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn("Erro ao criar produto no servidor, criando localmente:", error.message)
        const newProduct: Product = {
          ...productDto,
          id: Math.max(...this.products.map((p) => p.id), 0) + 1,
          dataCriacao: new Date(),
        }
        this.products.push(newProduct)
        this.productsSubject.next([...this.products])
        return of(newProduct)
      }),
    )
  }

  updateProduct(id: number, productDto: Partial<CreateProductDto>): Observable<Product | null> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productDto).pipe(
      tap((updatedProduct) => {
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = updatedProduct
          this.productsSubject.next([...this.products])
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn(`Erro ao atualizar produto ${id} no servidor, atualizando localmente:`, error.message)
        const index = this.products.findIndex((p) => p.id === id)
        if (index === -1) {
          return of(null)
        }
        this.products[index] = { ...this.products[index], ...productDto }
        this.productsSubject.next([...this.products])
        return of(this.products[index])
      }),
    )
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products.splice(index, 1)
          this.productsSubject.next([...this.products])
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn(`Erro ao deletar produto ${id} no servidor, deletando localmente:`, error.message)
        const index = this.products.findIndex((p) => p.id === id)
        if (index === -1) {
          return of(false)
        }
        this.products.splice(index, 1)
        this.productsSubject.next([...this.products])
        return of(true)
      }),
      map(() => true),
    )
  }

  private handleError(operation: string, error: any): void {
  const timestamp = new Date().toISOString()
  console.error(`[${timestamp}] Falha na operação: ${operation}`, {
    message: error.message,
    status: error.status,
    url: error.url
  })
}}
