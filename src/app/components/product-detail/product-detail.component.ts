import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, ActivatedRoute } from "@angular/router"
import { ProductService } from "../../services/product.service"
import { Product } from "../../models/product.model"

// PrimeNG Imports
import { CardModule } from "primeng/card"
import { ButtonModule } from "primeng/button"
import { TagModule } from "primeng/tag"
import { DividerModule } from "primeng/divider"
import { ToastModule } from "primeng/toast"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { MessageService, ConfirmationService } from "primeng/api"

@Component({
    selector: "app-product-detail",
    imports: [CommonModule, CardModule, ButtonModule, TagModule, DividerModule, ToastModule, ConfirmDialogModule],
    providers: [MessageService, ConfirmationService],
    template: `
    <div class="max-w-4xl mx-auto" *ngIf="product">
      <div class="mb-4">
        <p-button 
          label="Voltar" 
          icon="pi pi-arrow-left" 
          [text]="true"
          (onClick)="goBack()">
        </p-button>
      </div>

      <p-card>
        <ng-template pTemplate="header">
          <div class="p-4 border-b">
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-3xl font-bold text-gray-800">{{ product.nome }}</h1>
                <p class="text-gray-600 mt-1">ID: {{ product.id }}</p>
              </div>
              <div class="flex space-x-2">
                <p-button 
                  label="Editar" 
                  icon="pi pi-pencil" 
                  severity="warning"
                  (onClick)="editProduct()">
                </p-button>
                <p-button 
                  label="Excluir" 
                  icon="pi pi-trash" 
                  severity="danger"
                  (onClick)="deleteProduct()">
                </p-button>
              </div>
            </div>
          </div>
        </ng-template>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Imagem do Produto -->
          <div class="space-y-4">
            <img 
              [src]="product.imagemUrl || '/placeholder.svg?height=400&width=400'" 
              [alt]="product.nome"
              class="w-full h-96 object-cover rounded-lg shadow-md">
            
            <div class="flex justify-center space-x-4">
              <p-tag 
                [value]="product.ativo ? 'Ativo' : 'Inativo'" 
                [severity]="product.ativo ? 'success' : 'danger'"
                class="text-lg">
              </p-tag>
              <p-tag 
                [value]="product.categoria" 
                [severity]="getCategorySeverity(product.categoria)"
                class="text-lg">
              </p-tag>
            </div>
          </div>

          <!-- Informações do Produto -->
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">Descrição</h3>
              <p class="text-gray-600 leading-relaxed">{{ product.descricao }}</p>
            </div>

            <p-divider></p-divider>

            <div class="grid grid-cols-2 gap-4">
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-green-800 mb-1">Preço</h4>
                <p class="text-2xl font-bold text-green-600">
                  {{ product.preco | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
                </p>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="text-sm font-medium text-blue-800 mb-1">Estoque</h4>
                <p class="text-2xl font-bold text-blue-600">
                  {{ product.estoque }} unidades
                </p>
              </div>
            </div>

            <p-divider></p-divider>

            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-gray-700">Informações Adicionais</h3>
              
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="font-medium text-gray-600">Data de Criação:</span>
                  <span class="text-gray-800">{{ product.dataCriacao | date:'dd/MM/yyyy' }}</span>
                </div>
                
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="font-medium text-gray-600">Status:</span>
                  <span [class]="product.ativo ? 'text-green-600' : 'text-red-600'">
                    {{ product.ativo ? 'Produto Ativo' : 'Produto Inativo' }}
                  </span>
                </div>
                
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="font-medium text-gray-600">Disponibilidade:</span>
                  <span [class]="product.estoque > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ product.estoque > 0 ? 'Em Estoque' : 'Fora de Estoque' }}
                  </span>
                </div>
              </div>
            </div>

            <p-divider></p-divider>

            <div class="flex space-x-4">
              <p-button 
                label="Editar Produto" 
                icon="pi pi-pencil" 
                class="flex-1"
                (onClick)="editProduct()">
              </p-button>
              <p-button 
                label="Duplicar" 
                icon="pi pi-copy" 
                severity="secondary"
                [outlined]="true"
                class="flex-1"
                (onClick)="duplicateProduct()">
              </p-button>
            </div>
          </div>
        </div>
      </p-card>
    </div>

    <!-- Loading State -->
    <div *ngIf="!product" class="max-w-4xl mx-auto">
      <p-card>
        <div class="text-center py-8">
          <i class="pi pi-spin pi-spinner text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-600">Carregando produto...</p>
        </div>
      </p-card>
    </div>

    <p-confirmDialog></p-confirmDialog>
    <p-toast></p-toast>
  `
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
      this.productService.getProduct(this.productId).subscribe((product) => {
        if (product) {
          this.product = product
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Erro",
            detail: "Produto não encontrado",
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
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => {
        if (this.productId) {
          this.productService.deleteProduct(this.productId).subscribe((success) => {
            if (success) {
              this.messageService.add({
                severity: "success",
                summary: "Sucesso",
                detail: "Produto excluído com sucesso",
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
      imagemUrl: this.product.imagemUrl,
    }

    this.productService.createProduct(duplicatedProduct).subscribe((newProduct) => {
      this.messageService.add({
        severity: "success",
        summary: "Sucesso",
        detail: "Produto duplicado com sucesso",
      })
      setTimeout(() => this.router.navigate(["/produtos/editar", newProduct.id]), 1500)
    })
  }

  goBack() {
    this.router.navigate(["/produtos"])
  }

  getCategorySeverity(
    categoria: string
  ): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
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
}
