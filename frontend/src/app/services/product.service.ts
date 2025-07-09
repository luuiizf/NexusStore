import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { BehaviorSubject, Observable, of, throwError } from "rxjs"
import { catchError, tap, map } from "rxjs/operators"
import { environment } from "../../environments/environments"
import type { Product, CreateProductDto, ProductStats } from "../models/product.model"

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`
  private products: Product[] = []
  private productsSubject = new BehaviorSubject<Product[]>([])

  constructor(private http: HttpClient) {
    console.log("ProductService initialized with API URL:", this.apiUrl)
  } 

  getProducts(params?: {
    page?: number
    search?: string
    categoria?: string
    ativo?: boolean
    ordering?: string
  }): Observable<Product[]> {
    let httpParams = new HttpParams()

    if (params) {
      if (params.page) httpParams = httpParams.set("page", params.page.toString())
      if (params.search) httpParams = httpParams.set("search", params.search)
      if (params.categoria) httpParams = httpParams.set("categoria", params.categoria)
      if (params.ativo !== undefined) httpParams = httpParams.set("ativo", params.ativo.toString())
      if (params.ordering) httpParams = httpParams.set("ordering", params.ordering)
    }

    console.log("Making request to:", `${this.apiUrl}/`, "with params:", httpParams.toString())

    return this.http.get<any>(`${this.apiUrl}/`, { params: httpParams }).pipe(
      map((response) => {
        console.log("API Response:", response)
        // Handle both paginated and non-paginated responses
        if (response && Array.isArray(response)) {
          return response
        } else if (response && response.results && Array.isArray(response.results)) {
          return response.results
        } else if (response && response.data && Array.isArray(response.data)) {
          return response.data
        }
        return []
      }),
      tap((products) => {
        console.log("Processed products:", products)
        this.products = products
        this.productsSubject.next([...products])
      }),
      catchError((error) => this.handleError("buscar produtos", error)),
    )
  }

  /**
   * Busca um produto específico por ID
   */
  getProduct(id: number): Observable<Product | undefined> {
    console.log("Getting product with ID:", id)
    return this.http.get<Product>(`${this.apiUrl}/${id}/`).pipe(
      tap((product) => console.log("Retrieved product:", product)),
      catchError((error) => {
        console.warn(`Produto ${id} não encontrado:`, error.message)
        return of(undefined)
      }),
    )
  }

  /**
   * Cria um novo produto
   */
  createProduct(productDto: CreateProductDto): Observable<Product> {
    console.log("Creating product:", productDto)
    return this.http.post<Product>(`${this.apiUrl}/`, productDto).pipe(
      tap((newProduct) => {
        console.log("Product created:", newProduct)
        this.products.push(newProduct)
        this.productsSubject.next([...this.products])
      }),
      catchError((error) => this.handleError("criar produto", error)),
    )
  }

  /**
   * Atualiza um produto existente
   */
  updateProduct(id: number, productDto: Partial<CreateProductDto>): Observable<Product | null> {
    console.log("Updating product:", id, productDto)
    return this.http.put<Product>(`${this.apiUrl}/${id}/`, productDto).pipe(
      tap((updatedProduct) => {
        console.log("Product updated:", updatedProduct)
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = updatedProduct
          this.productsSubject.next([...this.products])
        }
      }),
      catchError((error) => this.handleError("atualizar produto", error)),
    )
  }

  /**
   * Atualização parcial de um produto
   */
  patchProduct(id: number, productDto: Partial<CreateProductDto>): Observable<Product | null> {
    console.log("Patching product:", id, productDto)
    return this.http.patch<Product>(`${this.apiUrl}/${id}/`, productDto).pipe(
      tap((updatedProduct) => {
        console.log("Product patched:", updatedProduct)
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = updatedProduct
          this.productsSubject.next([...this.products])
        }
      }),
      catchError((error) => this.handleError("atualizar produto", error)),
    )
  }

  /**
   * Remove um produto
   */
  deleteProduct(id: number): Observable<boolean> {
    console.log("Deleting product:", id)
    return this.http.delete<void>(`${this.apiUrl}/${id}/`).pipe(
      tap(() => {
        console.log("Product deleted:", id)
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products.splice(index, 1)
          this.productsSubject.next([...this.products])
        }
      }),
      map(() => true),
      catchError((error) => {
        console.error("Erro ao deletar produto:", error)
        return of(false)
      }),
    )
  }

  /**
   * Duplica um produto
   */
  duplicateProduct(id: number): Observable<Product> {
    console.log("Duplicating product:", id)
    return this.http.post<Product>(`${this.apiUrl}/${id}/duplicar/`, {}).pipe(
      tap((duplicatedProduct) => {
        console.log("Product duplicated:", duplicatedProduct)
        this.products.push(duplicatedProduct)
        this.productsSubject.next([...this.products])
      }),
      catchError((error) => this.handleError("duplicar produto", error)),
    )
  }

  /**
   * Busca estatísticas dos produtos
   */
  getStatistics(): Observable<ProductStats> {
    console.log("Getting statistics")
    return this.http.get<ProductStats>(`${this.apiUrl}/estatisticas/`).pipe(
      tap((stats) => console.log("Statistics retrieved:", stats)),
      catchError((error) => this.handleError("buscar estatísticas", error)),
    )
  }

  /**
   * Lista todas as categorias disponíveis
   */
  getCategories(): Observable<string[]> {
    console.log("Getting categories")
    return this.http.get<{ categorias: string[] }>(`${this.apiUrl}/categorias/`).pipe(
      map((response) => response.categorias),
      tap((categories) => console.log("Categories retrieved:", categories)),
      catchError((error) => {
        console.warn("Erro ao buscar categorias, usando padrão:", error.message)
        return of(["Eletrônicos", "Informática", "Áudio", "Casa e Jardim", "Esportes", "Moda", "Livros"])
      }),
    )
  }

  /**
   * Observable para componentes se inscreverem
   */
  getProductsObservable(): Observable<Product[]> {
    return this.productsSubject.asObservable()
  }

  /**
   * Tratamento centralizado de erros
   */
  private handleError(operation: string, error: HttpErrorResponse): Observable<never> {
    let errorMessage = `Erro ao ${operation}`

    console.error(`[ProductService] Error details:`, {
      operation,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      error: error.error,
    })

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage += `: ${error.error.message}`
    } else {
      // Erro do lado do servidor
      if (error.status === 0) {
        errorMessage += ": Servidor não disponível. Verifique se o backend está rodando."
      } else if (error.status === 404) {
        errorMessage += ": Endpoint não encontrado. Verifique a URL da API."
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage += `: ${error.error?.detail || error.error?.message || "Dados inválidos"}`
      } else if (error.status >= 500) {
        errorMessage += ": Erro interno do servidor"
      } else {
        errorMessage += `: ${error.message}`
      }
    }

    console.error(`[ProductService] ${errorMessage}`, error)
    return throwError(() => new Error(errorMessage))
  }
}
