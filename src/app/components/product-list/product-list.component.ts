import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { Router } from "@angular/router"
import  { ProductService } from "../../services/product.service"
import  { Product } from "../../models/product.model"

// PrimeNG Imports
import { TableModule } from "primeng/table"
import { ButtonModule } from "primeng/button"
import { TagModule } from "primeng/tag"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { ToastModule } from "primeng/toast"
import { ToolbarModule } from "primeng/toolbar"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { FormsModule } from "@angular/forms"
import { SkeletonModule } from "primeng/skeleton"
import { TooltipModule } from "primeng/tooltip"

import { ConfirmationService, MessageService } from "primeng/api"

@Component({
  standalone: true,
  selector: "app-product-list",
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    CardModule,
    InputTextModule,
    FormsModule,
    SkeletonModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="animate-fade-in">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl mb-8 p-8 border border-gray-100">
        <div class="relative">
          <div class="flex items-center space-x-3 mb-4">
            <div class="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <i class="pi pi-box text-white text-2xl"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">Gerenciamento de Produtos</h1>
              <p class="text-gray-600 mt-1">Gerencie seu catálogo com facilidade e eficiência</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total de Produtos</p>
                  <p class="text-2xl font-bold text-gray-800">{{ products.length }}</p>
                </div>
                <div class="p-3 bg-blue-100 rounded-lg">
                  <i class="pi pi-box text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Produtos Ativos</p>
                  <p class="text-2xl font-bold text-green-600">{{ getActiveProductsCount() }}</p>
                </div>
                <div class="p-3 bg-green-100 rounded-lg">
                  <i class="pi pi-check-circle text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Valor Total</p>
                  <p class="text-2xl font-bold text-purple-600">{{ getTotalValue() | currency:'BRL':'symbol':'1.0-0':'pt-BR' }}</p>
                </div>
                <div class="p-3 bg-purple-100 rounded-lg">
                  <i class="pi pi-dollar text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <p-card class="animate-slide-up">
        <ng-template pTemplate="header">
          <div class="gradient-primary text-white p-6">
            <h2 class="text-xl font-semibold">Catálogo de Produtos</h2>
            <p class="text-blue-100 mt-1">Visualize e gerencie todos os seus produtos</p>
          </div>
        </ng-template>

        <p-toolbar class="mb-6 border-0 bg-gradient-to-r from-gray-50 to-white">
          <div class="p-toolbar-group-start">
            <p-button 
              label="Novo Produto" 
              severity="primary"
              (onClick)="navigateToNew()"
              class="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <i class="pi pi-plus mr-2"></i>
            </p-button>
          </div>
          
          <div class="p-toolbar-group-end">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-search text-gray-400"></i>
              </div>
              <input 
                pInputText 
                type="text" 
                placeholder="Buscar produtos..."
                [(ngModel)]="searchValue"
                (input)="onGlobalFilter($event)"
                class="pl-10 pr-4 py-2 w-64 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
            </div>
          </div>
        </p-toolbar>

        <p-table 
          #dt
          [value]="products" 
          [paginator]="true" 
          [rows]="10"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} produtos"
          [rowsPerPageOptions]="[5, 10, 20]"
          [globalFilterFields]="['nome', 'categoria', 'descricao']"
          responsiveLayout="scroll"
          [loading]="loading"
          class="custom-table">
          
          <ng-template pTemplate="header">
            <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
              <th pSortableColumn="id" class="text-center">
                <div class="flex items-center justify-center space-x-2">
                  <span class="font-semibold">ID</span>
                  <p-sortIcon field="id"></p-sortIcon>
                </div>
              </th>
              <th pSortableColumn="nome">
                <div class="flex items-center space-x-2">
                  <span class="font-semibold">Produto</span>
                  <p-sortIcon field="nome"></p-sortIcon>
                </div>
              </th>
              <th pSortableColumn="categoria">
                <div class="flex items-center space-x-2">
                  <span class="font-semibold">Categoria</span>
                  <p-sortIcon field="categoria"></p-sortIcon>
                </div>
              </th>
              <th pSortableColumn="preco">
                <div class="flex items-center space-x-2">
                  <span class="font-semibold">Preço</span>
                  <p-sortIcon field="preco"></p-sortIcon>
                </div>
              </th>
              <th pSortableColumn="estoque">
                <div class="flex items-center space-x-2">
                  <span class="font-semibold">Estoque</span>
                  <p-sortIcon field="estoque"></p-sortIcon>
                </div>
              </th>
              <th class="text-center">
                <span class="font-semibold">Status</span>
              </th>
              <th class="text-center">
                <span class="font-semibold">Ações</span>
              </th>
            </tr>
          </ng-template>
          
          <ng-template pTemplate="body" let-product>
            <tr class="hover:bg-gray-50 transition-all duration-200">
              <td class="text-center">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {{ product.id }}
                </span>
              </td>
              <td>
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <img 
                      [src]="product.imagemUrl || '/placeholder.svg?height=50&width=50'" 
                      [alt]="product.nome"
                      class="w-12 h-12 rounded-xl object-cover shadow-md border-2 border-white">
                    <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" 
                         *ngIf="product.ativo"></div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-gray-900 truncate">{{ product.nome }}</p>
                    <p class="text-sm text-gray-500 truncate max-w-xs">{{ product.descricao }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p-tag 
                  [value]="product.categoria" 
                  [severity]="getCategorySeverity(product.categoria)"
                  class="font-medium">
                </p-tag>
              </td>
              <td>
                <div class="flex items-center space-x-1">
                  <span class="text-lg font-bold text-green-600">
                    {{ formatCurrency(product.preco) }}
                  </span>
                </div>
              </td>
              <td>
                <p-tag 
                  [value]="product.estoque + ' un.'" 
                  [severity]="getStockSeverity(product.estoque)"
                  class="font-medium">
                </p-tag>
              </td>
              <td class="text-center">
                <p-tag 
                  [value]="product.ativo ? 'Ativo' : 'Inativo'" 
                  [severity]="product.ativo ? 'success' : 'danger'"
                  class="font-medium">
                </p-tag>
              </td>
              <td>
                <div class="flex justify-center space-x-2">
                  <p-button 
                    [text]="true"
                    [rounded]="true"
                    severity="info"
                    pTooltip="Visualizar"
                    tooltipPosition="top"
                    (onClick)="viewProduct(product.id)"
                    class="hover:bg-blue-50 transition-colors duration-200">
                    <i class="pi pi-eye text-blue-600"></i>
                  </p-button>
                  <p-button 
                    [text]="true"
                    [rounded]="true"
                    severity="warn"
                    pTooltip="Editar"
                    tooltipPosition="top"
                    (onClick)="editProduct(product.id)"
                    class="hover:bg-yellow-50 transition-colors duration-200">
                    <i class="pi pi-pencil text-yellow-600"></i>
                  </p-button>
                  <p-button 
                    [text]="true"
                    [rounded]="true"
                    severity="danger"
                    pTooltip="Excluir"
                    tooltipPosition="top"
                    (onClick)="deleteProduct(product)"
                    class="hover:bg-red-50 transition-colors duration-200">
                    <i class="pi pi-trash text-red-600"></i>
                  </p-button>
                </div>
              </td>
            </tr>
          </ng-template>
          
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="7" class="text-center py-12">
                <div class="text-gray-500 animate-fade-in">
                  <div class="mb-4">
                    <i class="pi pi-inbox text-6xl text-gray-300"></i>
                  </div>
                  <p class="text-xl font-medium mb-2">Nenhum produto encontrado</p>
                  <p class="text-sm text-gray-400 mb-6">Comece adicionando seu primeiro produto ao catálogo</p>
                  <p-button 
                    label="Adicionar Produto" 
                    severity="primary"
                    (onClick)="navigateToNew()"
                    class="gradient-primary text-white border-0">
                    <i class="pi pi-plus mr-2"></i>
                  </p-button>
                </div>
              </td>
            </tr>
          </ng-template>

          <ng-template pTemplate="loadingbody">
            <tr>
              <td colspan="7">
                <div class="flex items-center justify-center py-8">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span class="ml-3 text-gray-600">Carregando produtos...</span>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>

    <p-confirmDialog 
      [style]="{width: '450px'}"
      [baseZIndex]="10000"
      rejectButtonStyleClass="p-button-text p-button-secondary"
      acceptButtonStyleClass="p-button-danger">
    </p-confirmDialog>
    
    <p-toast position="top-right"></p-toast>
  `,
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  searchValue = ""
  loading = false

  constructor(
    private productService: ProductService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.loading = true
    this.productService.getProducts().subscribe((products) => {
      this.products = products
      this.loading = false
    })
  }

  navigateToNew() {
    this.router.navigate(["/produtos/novo"])
  }

  viewProduct(id: number) {
    this.router.navigate(["/produtos", id])
  }

  editProduct(id: number) {
    this.router.navigate(["/produtos/editar", id])
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o produto "${product.nome}"?`,
      header: "Confirmar Exclusão",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim, excluir",
      rejectLabel: "Cancelar",
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe((success) => {
          if (success) {
            this.messageService.add({
              severity: "success",
              summary: "Sucesso!",
              detail: "Produto excluído com sucesso",
              life: 3000,
            })
            this.loadProducts()
          }
        })
      },
    })
  }

  onGlobalFilter(event: any) {
    // Implementação do filtro global será feita pelo PrimeNG Table
  }

  getActiveProductsCount(): number {
    return this.products.filter((p) => p.ativo).length
  }

  getTotalValue(): number {
    return this.products.reduce((total, product) => total + (product.preco || 0) * (product.estoque || 0), 0)
  }

  formatCurrency(value: number): string {
    if (value == null || value === undefined) return "R$ 0,00"
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  getCategorySeverity(
    categoria: string,
  ): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (categoria.toLowerCase()) {
      case "eletrônicos":
        return "info"
      case "informática":
        return "warning"
      case "áudio":
        return "success"
      case "casa e jardim":
        return "secondary"
      case "esportes":
        return "contrast"
      case "moda":
        return "danger"
      default:
        return "secondary"
    }
  }

  getStockSeverity(estoque: number): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    if (estoque === 0) return "danger"
    if (estoque < 5) return "warning"
    if (estoque < 10) return "info"
    return "success"
  }
}