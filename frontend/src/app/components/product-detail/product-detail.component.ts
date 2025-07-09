import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { Router, ActivatedRoute } from "@angular/router"
import  { ProductService } from "../../services/product.service"
import  { Product } from "../../models/product.model"

// PrimeNG Imports
import { CardModule } from "primeng/card"
import { ButtonModule } from "primeng/button"
import { TagModule } from "primeng/tag"
import { DividerModule } from "primeng/divider"
import { ToastModule } from "primeng/toast"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { SkeletonModule } from "primeng/skeleton"
import { MessageService, ConfirmationService } from "primeng/api"

@Component({
  standalone: true,
  selector: "app-product-detail",
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule,
    SkeletonModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="animate-fade-in max-w-6xl mx-auto" *ngIf="product">
      <!-- Header Section -->
      <div class="mb-8">
        <p-button 
          label="Voltar" 
          severity="secondary"
          [text]="true"
          (onClick)="goBack()"
          class="mb-4 hover:bg-gray-100 transition-colors duration-200">
          <i class="pi pi-arrow-left mr-2"></i>
        </p-button>
        
        <div class="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 border border-gray-100">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div class="flex items-center space-x-4">
              <div class="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <i class="pi pi-eye text-white text-2xl"></i>
              </div>
              <div>
                <h1 class="text-3xl font-bold text-gray-800">{{ product.nome }}</h1>
                <p class="text-gray-600 mt-1">ID: #{{ product.id.toString().padStart(4, '0') }}</p>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <p-button 
                label="Editar" 
                severity="help"
                (onClick)="editProduct()"
                class="shadow-lg hover:shadow-xl transition-all duration-300">
                <i class="pi pi-pencil mr-2"></i>
              </p-button>
              <p-button 
                label="Duplicar" 
                severity="secondary"
                [outlined]="true"
                (onClick)="duplicateProduct()"
                class="shadow-lg hover:shadow-xl transition-all duration-300">
                <i class="pi pi-copy mr-2"></i>
              </p-button>
              <p-button 
                label="Excluir" 
                severity="danger"
                (onClick)="deleteProduct()"
                class="shadow-lg hover:shadow-xl transition-all duration-300">
                <i class="pi pi-trash mr-2"></i>
              </p-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Product Image and Quick Info -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Image Card -->
          <p-card class="animate-slide-up">
            <ng-template pTemplate="header">
              <div class="gradient-primary text-white p-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <i class="pi pi-image mr-2"></i>
                  Imagem do Produto
                </h3>
              </div>
            </ng-template>
            
            <div class="text-center">
              <div class="relative inline-block">
                <img 
                  [src]="product.imagem_url || '/placeholder.svg?height=300&width=300'" 
                  [alt]="product.nome"
                  class="w-full max-w-sm h-64 object-cover rounded-xl shadow-lg border-4 border-white">
                <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-lg"
                     [class]="product.ativo ? 'bg-green-500' : 'bg-red-500'"></div>
              </div>
              
              <div class="flex justify-center space-x-3 mt-6">
                <p-tag 
                  [value]="product.ativo ? 'Ativo' : 'Inativo'" 
                  [severity]="product.ativo ? 'success' : 'danger'"
                  class="text-base font-semibold px-4 py-2">
                  <i [class]="product.ativo ? 'pi pi-check-circle' : 'pi pi-times-circle'" class="mr-2"></i>
                </p-tag>
                <p-tag 
                  [value]="product.categoria" 
                  [severity]="getCategorySeverity(product.categoria)"
                  class="text-base font-semibold px-4 py-2">
                </p-tag>
              </div>
            </div>
          </p-card>

          <!-- Quick Stats -->
          <p-card class="animate-slide-up">
            <ng-template pTemplate="header">
              <div class="gradient-secondary text-gray-800 p-4">
                <h3 class="text-lg font-semibold">Estatísticas Rápidas</h3>
              </div>
            </ng-template>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <i class="pi pi-dollar text-green-600"></i>
                  </div>
                  <span class="font-medium text-gray-700">Preço</span>
                </div>
                <span class="text-xl font-bold text-green-600">
                  {{ formatCurrency(product.preco) }}
                </span>
              </div>

              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <i class="pi pi-box text-blue-600"></i>
                  </div>
                  <span class="font-medium text-gray-700">Estoque</span>
                </div>
                <span class="text-xl font-bold text-blue-600">
                  {{ product.estoque }} un.
                </span>
              </div>

              <div class="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-purple-100 rounded-lg">
                    <i class="pi pi-calendar text-purple-600"></i>
                  </div>
                  <span class="font-medium text-gray-700">Criado em</span>
                </div>
                <span class="text-sm font-medium text-purple-600">
                  {{ product.data_criacao | date:'dd/MM/yyyy' }}
                </span>
              </div>
            </div>
          </p-card>
        </div>

        <!-- Product Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Description Card -->
          <p-card class="animate-slide-up">
            <ng-template pTemplate="header">
              <div class="gradient-primary text-white p-4">
                <h3 class="text-lg font-semibold">Descrição do Produto</h3>
              </div>
            </ng-template>
            
            <div class="prose max-w-none">
              <p class="text-gray-700 leading-relaxed text-lg">{{ product.descricao }}</p>
            </div>
          </p-card>

          <!-- Detailed Information -->
          <p-card class="animate-slide-up">
            <ng-template pTemplate="header">
              <div class="gradient-secondary text-gray-800 p-4">
                <h3 class="text-lg font-semibold">Informações Detalhadas</h3>
              </div>
            </ng-template>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="border-l-4 border-blue-500 pl-4">
                  <h4 class="font-semibold text-gray-800 mb-1">Identificação</h4>
                  <p class="text-gray-600">ID: #{{ product.id.toString().padStart(4, '0') }}</p>
                  <p class="text-gray-600">Nome: {{ product.nome }}</p>
                </div>

                <div class="border-l-4 border-green-500 pl-4">
                  <h4 class="font-semibold text-gray-800 mb-1">Categoria</h4>
                  <p class="text-gray-600">{{ product.categoria }}</p>
                </div>

                <div class="border-l-4 border-purple-500 pl-4">
                  <h4 class="font-semibold text-gray-800 mb-1">Data de Criação</h4>
                  <p class="text-gray-600">{{ product.data_criacao | date:'dd/MM/yyyy HH:mm' }}</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="border-l-4 border-yellow-500 pl-4">
                  <h4 class="font-semibold text-gray-800 mb-1">Status</h4>
                  <p [class]="product.ativo ? 'text-green-600' : 'text-red-600'" class="font-medium">
                    {{ product.ativo ? 'Produto Ativo' : 'Produto Inativo' }}
                  </p>
                  <p class="text-gray-600 text-sm">
                    {{ product.ativo ? 'Visível na loja' : 'Oculto na loja' }}
                  </p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                  <h4 class="font-semibold text-gray-800 mb-1">Disponibilidade</h4>
                  <p [class]="product.estoque > 0 ? 'text-green-600' : 'text-red-600'" class="font-medium">
                    {{ product.estoque > 0 ? 'Em Estoque' : 'Fora de Estoque' }}
                  </p>
                  <p class="text-gray-600 text-sm">
                    {{ product.estoque }} unidades disponíveis
                  </p>
                </div>

                <div class="border-l-4 border-indigo-500 pl-4">
                  <h4 class="font-semibold text-gray-800 mb-1">Valor Total</h4>
                  <p class="text-indigo-600 font-bold text-lg">
                    {{ formatCurrency((product.preco || 0) * (product.estoque || 0)) }}
                  </p>
                  <p class="text-gray-600 text-sm">
                    Valor total em estoque
                  </p>
                </div>
              </div>
            </div>
          </p-card>

          <!-- Action Buttons -->
          <p-card class="animate-slide-up">
            <div class="flex flex-col sm:flex-row gap-4">
              <p-button 
                label="Editar Produto" 
                severity="help"
                class="flex-1 shadow-lg hover:shadow-xl transition-all duration-300"
                (onClick)="editProduct()">
                <i class="pi pi-pencil mr-2"></i>
              </p-button>
              
              <p-button 
                label="Duplicar Produto" 
                severity="secondary"
                [outlined]="true"
                class="flex-1 shadow-lg hover:shadow-xl transition-all duration-300"
                (onClick)="duplicateProduct()">
                <i class="pi pi-copy mr-2"></i>
              </p-button>
              
              <p-button 
                label="Excluir Produto" 
                severity="danger"
                class="flex-1 shadow-lg hover:shadow-xl transition-all duration-300"
                (onClick)="deleteProduct()">
                <i class="pi pi-trash mr-2"></i>
              </p-button>
            </div>
          </p-card>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div *ngIf="!product" class="max-w-6xl mx-auto animate-fade-in">
      <p-card>
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600 text-lg">Carregando produto...</p>
        </div>
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
export class ProductDetailComponent implements OnInit {
  product?: Product
  productId?: number

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = +params["id"]
      this.loadProduct()
    })
  }

  loadProduct() {
    if (this.productId) {
      this.productService.getProduct(this.productId!).subscribe((product) => {
        if (product) {
          this.product = product
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Erro",
            detail: "Produto não encontrado",
            life: 5000,
          })
          this.router.navigate(["/produtos"])
        }
      })
    }
  }

  editProduct() {
    this.router.navigate(["/produtos/editar", this.productId])
  }

  deleteProduct() {
    if (!this.product) return

    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o produto "${this.product.nome}"?`,
      header: "Confirmar Exclusão",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim, excluir",
      rejectLabel: "Cancelar",
      accept: () => {
        if (this.productId) {
          this.productService.deleteProduct(this.productId).subscribe((success) => {
            if (success) {
              this.messageService.add({
                severity: "success",
                summary: "Sucesso!",
                detail: "Produto excluído com sucesso",
                life: 3000,
              })
              setTimeout(() => this.router.navigate(["/produtos"]), 1500)
            }
          })
        }
      },
    })
  }

  duplicateProduct() {
    if (!this.product) return

    const duplicatedProduct = {
      nome: `${this.product.nome} (Cópia)`,
      descricao: this.product.descricao,
      preco: this.product.preco,
      categoria: this.product.categoria,
      estoque: this.product.estoque,
      ativo: false, // Criar como inativo por padrão
      imagemUrl: this.product.imagem_url,
    }

    this.productService.createProduct(duplicatedProduct).subscribe((newProduct) => {
      this.messageService.add({
        severity: "success",
        summary: "Sucesso!",
        detail: "Produto duplicado com sucesso",
        life: 3000,
      })
      setTimeout(() => this.router.navigate(["/produtos/editar", newProduct.id]), 1500)
    })
  }

  goBack() {
    this.router.navigate(["/produtos"])
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
}
