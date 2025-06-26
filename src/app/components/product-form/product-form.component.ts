import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { ProductService } from "../../services/product.service"

// PrimeNG Imports
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { InputNumberModule } from "primeng/inputnumber"
import { DropdownModule } from "primeng/dropdown"
import { InputSwitchModule } from "primeng/inputswitch"
import { ButtonModule } from "primeng/button"
import { ToastModule } from "primeng/toast"
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { DividerModule } from "primeng/divider"
import { MessageService } from "primeng/api"

import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { 
  heroPlus, 
  heroCheck,
  heroXMark,
  heroArrowLeft,
  heroPencil,
  heroPhoto,
  heroSparkles
} from '@ng-icons/heroicons/outline'

@Component({
  selector: "app-product-form",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputSwitchModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    DividerModule,
    NgIconComponent
  ],
  providers: [
    MessageService,
    provideIcons({ 
      heroPlus, 
      heroCheck,
      heroXMark,
      heroArrowLeft,
      heroPencil,
      heroPhoto,
      heroSparkles
    })
  ],
  template: `
    <div class="animate-fade-in max-w-5xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8">
        <p-button 
          label="Voltar" 
          severity="secondary"
          [text]="true"
          (onClick)="onCancel()"
          class="mb-4 hover:bg-gray-100 transition-colors duration-200">
          <ng-icon name="heroArrowLeft" class="mr-2"></ng-icon>
        </p-button>
        
        <div class="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 border border-gray-100">
          <div class="flex items-center space-x-4">
            <div class="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <ng-icon [name]="isEditMode ? 'heroPencil' : 'heroPlus'" class="text-white text-2xl"></ng-icon>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">
                {{ isEditMode ? 'Editar Produto' : 'Novo Produto' }}
              </h1>
              <p class="text-gray-600 mt-1">
                {{ isEditMode ? 'Atualize as informações do produto' : 'Adicione um novo produto ao catálogo' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <p-card class="animate-slide-up">
        <ng-template pTemplate="header">
          <div class="gradient-primary text-white p-6">
            <h2 class="text-xl font-semibold flex items-center">
              <ng-icon name="heroSparkles" class="mr-3"></ng-icon>
              Informações do Produto
            </h2>
            <p class="text-blue-100 mt-1">Preencha todos os campos obrigatórios</p>
          </div>
        </ng-template>

        <div class="p-6">
          <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="space-y-8">
            <!-- Informações Básicas -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <div class="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Informações Básicas
              </h3>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Nome -->
                <div class="space-y-3">
                  <label for="nome" class="block text-sm font-semibold text-gray-700">
                    Nome do Produto *
                  </label>
                  <input 
                    id="nome"
                    type="text" 
                    pInputText 
                    formControlName="nome"
                    placeholder="Digite o nome do produto"
                    class="w-full transition-all duration-300"
                    [class.border-red-300]="productForm.get('nome')?.invalid && productForm.get('nome')?.touched"
                    [class.border-green-300]="productForm.get('nome')?.valid && productForm.get('nome')?.touched">
                  <small 
                    class="text-red-500 font-medium" 
                    *ngIf="productForm.get('nome')?.invalid && productForm.get('nome')?.touched">
                    Nome é obrigatório (mínimo 2 caracteres)
                  </small>
                </div>

                <!-- Categoria -->
                <div class="space-y-3">
                  <label for="categoria" class="block text-sm font-semibold text-gray-700">
                    Categoria *
                  </label>
                  <p-dropdown 
                    id="categoria"
                    formControlName="categoria"
                    [options]="categorias"
                    placeholder="Selecione uma categoria"
                    class="w-full"
                    [class.border-red-300]="productForm.get('categoria')?.invalid && productForm.get('categoria')?.touched">
                  </p-dropdown>
                  <small 
                    class="text-red-500 font-medium" 
                    *ngIf="productForm.get('categoria')?.invalid && productForm.get('categoria')?.touched">
                    Categoria é obrigatória
                  </small>
                </div>
              </div>

              <!-- Descrição -->
              <div class="space-y-3">
                <label for="descricao" class="block text-sm font-semibold text-gray-700">
                  Descrição *
                </label>
                <textarea 
                  id="descricao"
                  pInputTextarea 
                  formControlName="descricao"
                  placeholder="Descreva o produto detalhadamente..."
                  rows="4"
                  class="w-full transition-all duration-300"
                  [class.border-red-300]="productForm.get('descricao')?.invalid && productForm.get('descricao')?.touched"
                  [class.border-green-300]="productForm.get('descricao')?.valid && productForm.get('descricao')?.touched">
                </textarea>
                <small 
                  class="text-red-500 font-medium" 
                  *ngIf="productForm.get('descricao')?.invalid && productForm.get('descricao')?.touched">
                  Descrição é obrigatória (mínimo 10 caracteres)
                </small>
              </div>
            </div>

            <p-divider></p-divider>

            <!-- Preço e Estoque -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <div class="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-3"></div>
                Preço e Estoque
              </h3>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Preço -->
                <div class="space-y-3">
                  <label for="preco" class="block text-sm font-semibold text-gray-700">
                    Preço *
                  </label>
                  <p-inputNumber
                    id="preco"
                    formControlName="preco"
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    placeholder="0,00"
                    class="w-full"
                    [class.border-red-300]="productForm.get('preco')?.invalid && productForm.get('preco')?.touched">
                  </p-inputNumber>
                  <small 
                    class="text-red-500 font-medium" 
                    *ngIf="productForm.get('preco')?.invalid && productForm.get('preco')?.touched">
                    Preço é obrigatório e deve ser maior que zero
                  </small>
                </div>

                <!-- Estoque -->
                <div class="space-y-3">
                  <label for="estoque" class="block text-sm font-semibold text-gray-700">
                    Quantidade em Estoque *
                  </label>
                  <p-inputNumber
                    id="estoque"
                    formControlName="estoque"
                    placeholder="0"
                    [min]="0"
                    class="w-full"
                    [class.border-red-300]="productForm.get('estoque')?.invalid && productForm.get('estoque')?.touched">
                  </p-inputNumber>
                  <small 
                    class="text-red-500 font-medium" 
                    *ngIf="productForm.get('estoque')?.invalid && productForm.get('estoque')?.touched">
                    Estoque é obrigatório
                  </small>
                </div>
              </div>
            </div>

            <p-divider></p-divider>

            <!-- Imagem e Status -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <div class="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
                Imagem e Status
              </h3>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- URL da Imagem -->
                <div class="space-y-3">
                  <label for="imagemUrl" class="block text-sm font-semibold text-gray-700 flex items-center">
                    <ng-icon name="heroPhoto" class="mr-2"></ng-icon>
                    URL da Imagem
                  </label>
                  <input 
                    id="imagemUrl"
                    type="url" 
                    pInputText 
                    formControlName="imagemUrl"
                    placeholder="https://exemplo.com/imagem.jpg"
                    class="w-full transition-all duration-300">
                  <small class="text-gray-500">
                    Adicione uma URL válida para a imagem do produto
                  </small>
                </div>

                <!-- Status Ativo -->
                <div class="space-y-3">
                  <label class="block text-sm font-semibold text-gray-700">
                    Status do Produto
                  </label>
                  <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <p-inputSwitch 
                      id="ativo"
                      formControlName="ativo">
                    </p-inputSwitch>
                    <div>
                      <p class="font-medium text-gray-800">
                        {{ productForm.get('ativo')?.value ? 'Produto Ativo' : 'Produto Inativo' }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ productForm.get('ativo')?.value ? 'Visível na loja' : 'Oculto na loja' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preview da Imagem -->
              <div *ngIf="productForm.get('imagemUrl')?.value" class="mt-6">
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  Preview da Imagem
                </label>
                <div class="relative inline-block">
                  <img 
                    [src]="productForm.get('imagemUrl')?.value" 
                    [alt]="productForm.get('nome')?.value || 'Preview'"
                    class="w-32 h-32 object-cover rounded-xl shadow-lg border-4 border-white"
                    (error)="onImageError($event)">
                  <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
              <p-button 
                label="Cancelar" 
                severity="secondary"
                [text]="true"
                (onClick)="onCancel()"
                class="w-full sm:w-auto hover:bg-gray-100 transition-colors duration-200">
                <ng-icon name="heroXMark" class="mr-2"></ng-icon>
              </p-button>
              
              <p-button 
                [label]="isEditMode ? 'Atualizar Produto' : 'Criar Produto'" 
                type="submit"
                [disabled]="productForm.invalid || isSubmitting"
                [loading]="isSubmitting"
                class="w-full sm:w-auto gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <ng-icon [name]="isEditMode ? 'heroCheck' : 'heroPlus'" class="mr-2" *ngIf="!isSubmitting"></ng-icon>
              </p-button>
            </div>
          </form>
        </div>
      </p-card>
    </div>

    <p-toast position="top-right"></p-toast>
  `
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup
  isEditMode = false
  isSubmitting = false
  productId?: number

  categorias = [
    { label: "Eletrônicos", value: "Eletrônicos" },
    { label: "Informática", value: "Informática" },
    { label: "Áudio", value: "Áudio" },
    { label: "Casa e Jardim", value: "Casa e Jardim" },
    { label: "Esportes", value: "Esportes" },
    { label: "Moda", value: "Moda" },
    { label: "Livros", value: "Livros" },
  ]

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.productForm = this.createForm()
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.isEditMode = true
        this.productId = +params["id"]
        this.loadProduct()
      }
    })
  }

  createForm(): FormGroup {
    return this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(2)]],
      descricao: ["", [Validators.required, Validators.minLength(10)]],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      categoria: ["", Validators.required],
      estoque: [0, [Validators.required, Validators.min(0)]],
      ativo: [true],
      imagemUrl: [""],
    })
  }

  loadProduct() {
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((product) => {
        if (product) {
          this.productForm.patchValue({
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            categoria: product.categoria,
            estoque: product.estoque,
            ativo: product.ativo,
            imagemUrl: product.imagemUrl || "",
          })
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Erro",
            detail: "Produto não encontrado",
            life: 5000
          })
          this.router.navigate(["/produtos"])
        }
      })
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true
      const formData = this.productForm.value

      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, formData).subscribe({
          next: (product) => {
            if (product) {
              this.messageService.add({
                severity: "success",
                summary: "Sucesso!",
                detail: "Produto atualizado com sucesso",
                life: 3000
              })
              setTimeout(() => this.router.navigate(["/produtos"]), 1500)
            }
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao atualizar produto",
              life: 5000
            })
            this.isSubmitting = false
          },
        })
      } else {
        this.productService.createProduct(formData).subscribe({
          next: (product) => {
            this.messageService.add({
              severity: "success",
              summary: "Sucesso!",
              detail: "Produto criado com sucesso",
              life: 3000
            })
            setTimeout(() => this.router.navigate(["/produtos"]), 1500)
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao criar produto",
              life: 5000
            })
            this.isSubmitting = false
          },
        })
      }
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Atenção",
        detail: "Por favor, preencha todos os campos obrigatórios",
        life: 5000
      })
      
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched()
      })
    }
  }

  onCancel() {
    this.router.navigate(["/produtos"])
  }

  onImageError(event: any) {
    event.target.src = '/placeholder.svg?height=128&width=128'
  }
}