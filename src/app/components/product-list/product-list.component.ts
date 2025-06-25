import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Router } from "@angular/router"
import type { ProductService } from "../../services/product.service"
import type { Product } from "../../models/product.model"

// PrimeNG Imports
import { TableModule } from "primeng/table"
import { ButtonModule } from "primeng/button"
import { TagModule } from "primeng/tag"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { ToastModule } from "primeng/toast"
import { ToolbarModule } from "primeng/toolbar"
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"

import { ConfirmationService, MessageService } from "primeng/api"

@Component({
  selector: "app-product-list",
  standalone: true,
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
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="space-y-6">
      <p-card>
        <ng-template pTemplate="header">
          <div class="p-4 border-b">
            <h2 class="text-2xl font-bold text-gray-800">Gerenciamento de Produtos</h2>
            <p class="text-gray-600 mt-1">Gerencie o catálogo de produtos da sua loja</p>
          </div>
        </ng-template>

        <p-toolbar class="mb-4">
          <div class="p-toolbar-group-start">
            <p-button 
              label="Novo Produto" 
              icon="pi pi-plus" 
              class="mr-2"
              (onClick)="navigateToNew()">
            </p-button>
          </div>
          
          <div class="p-toolbar-group-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <input 
                pInputText 
                type="text" 
                placeholder="Buscar produtos..."
                [(ngModel)]="searchValue"
                (input)="onGlobalFilter($event)"
                class="w-64">
            </span>
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
          class="p-datatable-gridlines">
          
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="id">
                ID <p-sortIcon field="id"></p-sortIcon>
              </th>
              <th pSortableColumn="nome">
                Nome <p-sortIcon field="nome"></p-sortIcon>
              </th>
              <th pSortableColumn="categoria">
                Categoria <p-sortIcon field="categoria"></p-sortIcon>
              </th>
              <th pSortableColumn="preco">
                Preço <p-sortIcon field="preco"></p-sortIcon>
              </th>
              <th pSortableColumn="estoque">
                Estoque <p-sortIcon field="estoque"></p-sortIcon>
              </th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </ng-template>
          
          <ng-template pTemplate="body" let-product>
            <tr>
              <td>{{ product.id }}</td>
              <td>
                <div class="flex items-center space-x-3">
                  <img 
                    [src]="product.imagemUrl || '/placeholder.svg?height=40&width=40'" 
                    [alt]="product.nome"
                    class="w-10 h-10 rounded-lg object-cover">
                  <div>
                    <div class="font-semibold">{{ product.nome }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">
                      {{ product.descricao }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <p-tag [value]="product.categoria" [severity]="getCategorySeverity(product.categoria)"></p-tag>
              </td>
              <td>
                <span class="font-semibold text-green-600">
                  {{ product.preco | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
                </span>
              </td>
              <td>
                <p-tag 
                  [value]="product.estoque.toString()" 
                  [severity]="getStockSeverity(product.estoque)">
                </p-tag>
              </td>
              <td>
                <p-tag 
                  [value]="product.ativo ? 'Ativo' : 'Inativo'" 
                  [severity]="product.ativo ? 'success' : 'danger'">
                </p-tag>
              </td>
              <td>
                <div class="flex space-x-2">
                  <p-button 
                    icon="pi pi-eye" 
                    [text]="true"
                    [rounded]="true"
                    severity="info"
                    pTooltip="Visualizar"
                    (onClick)="viewProduct(product.id)">
                  </p-button>
                  <p-button 
                    icon="pi pi-pencil" 
                    [text]="true"
                    [rounded]="true"
                    severity="warning"
                    pTooltip="Editar"
                    (onClick)="editProduct(product.id)">
                  </p-button>
                  <p-button 
                    icon="pi pi-trash" 
                    [text]="true"
                    [rounded]="true"
                    severity="danger"
                    pTooltip="Excluir"
                    (onClick)="deleteProduct(product)">
                  </p-button>
                </div>
              </td>
            </tr>
          </ng-template>
          
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="7" class="text-center py-8">
                <div class="text-gray-500">
                  <i class="pi pi-inbox text-4xl mb-4 block"></i>
                  <p class="text-lg">Nenhum produto encontrado</p>
                  <p class="text-sm">Comece adicionando seu primeiro produto</p>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>

    <p-confirmDialog></p-confirmDialog>
    <p-toast></p-toast>
  `,
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  searchValue = ""

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
    this.productService.getProducts().subscribe((products) => {
      this.products = products
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
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe((success) => {
          if (success) {
            this.messageService.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Produto excluído com sucesso",
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

  getCategorySeverity(categoria: string): string {
    switch (categoria.toLowerCase()) {
      case "eletrônicos":
        return "info"
      case "informática":
        return "warning"
      case "áudio":
        return "success"
      default:
        return "secondary"
    }
  }

  getStockSeverity(estoque: number): string {
    if (estoque === 0) return "danger"
    if (estoque < 5) return "warning"
    return "success"
  }
}
