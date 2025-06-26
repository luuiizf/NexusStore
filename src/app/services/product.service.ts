import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import type { Product, CreateProductDto } from "../models/product.model"

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      nome: "Iphone 13 Pro",
      descricao: "Celular bom demais",
      preco: 3999.99,
      categoria: "Eletrônicos",
      ativo: true,
      estoque: 15,
      imagemUrl: "https://th.bing.com/th/id/R.5594d870cce59de97efe9b52e63ca0b2?rik=B%2f%2fnQBe5LeNUbg&pid=ImgRaw&r=0",
      dataCriacao: new Date("2024-01-15"),
    },
    {
      id: 2,
      nome: "Notebook Gamer Ultra",
      descricao: "Notebook para jogos com placa de vídeo RTX 4060 e 16GB RAM",
      preco: 4999.99,
      categoria: "Informática",
      ativo: true,
      estoque: 8,
      imagemUrl: "/placeholder.svg?height=300&width=300",
      dataCriacao: new Date("2024-02-10"),
    },
    {
      id: 3,
      nome: "Fone Bluetooth Premium",
      descricao: "Fone de ouvido sem fio com cancelamento de ruído ativo",
      preco: 899.99,
      categoria: "Áudio",
      ativo: false,
      estoque: 0,
      imagemUrl: "/placeholder.svg?height=300&width=300",
      dataCriacao: new Date("2024-01-20"),
    },
    {
      id: 4,
      nome: 'Smart TV 55" 4K',
      descricao: "Smart TV LED 55 polegadas com resolução 4K e HDR",
      preco: 2199.99,
      categoria: "Eletrônicos",
      ativo: true,
      estoque: 12,
      imagemUrl: "/placeholder.svg?height=300&width=300",
      dataCriacao: new Date("2024-03-05"),
    },
  ]

  private productsSubject = new BehaviorSubject<Product[]>(this.products)
  private nextId = 5

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable()
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id)
    return of(product)
  }

  createProduct(productDto: CreateProductDto): Observable<Product> {
    const newProduct: Product = {
      ...productDto,
      id: this.nextId++,
      dataCriacao: new Date(),
    }

    this.products.push(newProduct)
    this.productsSubject.next([...this.products])
    return of(newProduct)
  }

  updateProduct(id: number, productDto: Partial<CreateProductDto>): Observable<Product | null> {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) {
      return of(null)
    }

    this.products[index] = { ...this.products[index], ...productDto }
    this.productsSubject.next([...this.products])
    return of(this.products[index])
  }

  deleteProduct(id: number): Observable<boolean> {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) {
      return of(false)
    }

    this.products.splice(index, 1)
    this.productsSubject.next([...this.products])
    return of(true)
  }
}
