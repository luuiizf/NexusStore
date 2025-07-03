import { Component, type OnInit, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
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
import { DividerModule } from "primeng/divider"
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { MessageService } from "primeng/api"

@Component({
  standalone: true,
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
    DividerModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <!-- Header Section -->
        <div class="mb-8">
          <p-button 
            label="Voltar" 
            severity="secondary"
            [text]="true"
            (onClick)="onCancel()"
            class="mb-6 hover:bg-gray-100 transition-colors duration-200 rounded-xl">
            <i class="pi pi-arrow-left mr-2"></i>
          </p-button>
        </div>

        <!-- Form Section -->
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <!-- Form Header -->
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
            <div class="flex items-center space-x-4 mb-2">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75"></div>
                <div class="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <i [class]="isEditMode ? 'pi pi-pencil' : 'pi pi-plus'" class="text-white text-2xl"></i>
                </div>
              </div>
              <div>
                <h1 class="text-xl font-bold text-white">
                  {{ isEditMode ? 'Editar Produto' : 'Novo Produto' }}
                </h1>
                <p class="text-blue-100 mt-1 text-base">
                  {{ isEditMode ? 'Atualize as informações do produto' : 'Adicione um novo produto ao catálogo' }}
                </p>
              </div>
            </div>
            <p class="text-blue-100 mt-2 text-lg">Preencha todos os campos obrigatórios</p>
          </div>

          <div class="p-8">
            <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="space-y-10">
              <!-- Informações Básicas -->
              <div class="space-y-8">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="w-3 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <h3 class="text-2xl font-bold text-gray-800">Informações Básicas</h3>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Nome -->
                  <div class="space-y-4">
                    <label for="nome" class="block text-lg font-semibold text-gray-700">
                      Nome do Produto *
                    </label>
                    <input 
                      id="nome"
                      type="text" 
                      pInputText 
                      formControlName="nome"
                      placeholder="Digite o nome do produto"
                      class="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                      [class.border-red-300]="productForm.get('nome')?.invalid && productForm.get('nome')?.touched"
                      [class.border-green-300]="productForm.get('nome')?.valid && productForm.get('nome')?.touched">
                    <small 
                      class="text-red-500 font-medium text-base" 
                      *ngIf="productForm.get('nome')?.invalid && productForm.get('nome')?.touched">
                      Nome é obrigatório (mínimo 2 caracteres)
                    </small>
                  </div>

                  <!-- Categoria -->
                  <div class="space-y-4">
                    <label for="categoria" class="block text-lg font-semibold text-gray-700">
                      Categoria *
                    </label>
                    <p-dropdown 
                      id="categoria"
                      formControlName="categoria"
                      [options]="categorias"
                      placeholder="Selecione uma categoria"
                      class="w-full"
                      styleClass="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500"
                      [class.border-red-300]="productForm.get('categoria')?.invalid && productForm.get('categoria')?.touched">
                    </p-dropdown>
                    <small 
                      class="text-red-500 font-medium text-base" 
                      *ngIf="productForm.get('categoria')?.invalid && productForm.get('categoria')?.touched">
                      Categoria é obrigatória
                    </small>
                  </div>
                </div>

                <!-- Descrição -->
                <div class="space-y-4">
                  <label for="descricao" class="block text-lg font-semibold text-gray-700">
                    Descrição *
                  </label>
                  <textarea 
                    id="descricao"
                    pInputTextarea 
                    formControlName="descricao"
                    placeholder="Descreva o produto detalhadamente..."
                    rows="5"
                    class="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none"
                    [class.border-red-300]="productForm.get('descricao')?.invalid && productForm.get('descricao')?.touched"
                    [class.border-green-300]="productForm.get('descricao')?.valid && productForm.get('descricao')?.touched">
                  </textarea>
                  <small 
                    class="text-red-500 font-medium text-base" 
                    *ngIf="productForm.get('descricao')?.invalid && productForm.get('descricao')?.touched">
                    Descrição é obrigatória (mínimo 10 caracteres)
                  </small>
                </div>
              </div>

              <p-divider></p-divider>

              <!-- Preço e Estoque -->
              <div class="space-y-8">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="w-3 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  <h3 class="text-2xl font-bold text-gray-800">Preço e Estoque</h3>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Preço -->
                  <div class="space-y-4">
                    <label for="preco" class="block text-lg font-semibold text-gray-700">
                      Preço *
                    </label>
                    <p-inputNumber
                      id="preco"
                      formControlName="preco"
                      mode="currency"
                      currency="BRL"
                      locale="pt-BR"
                      placeholder="0,00"
                      styleClass="w-full"
                      inputStyleClass="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500"
                      [class.border-red-300]="productForm.get('preco')?.invalid && productForm.get('preco')?.touched">
                    </p-inputNumber>
                    <small 
                      class="text-red-500 font-medium text-base" 
                      *ngIf="productForm.get('preco')?.invalid && productForm.get('preco')?.touched">
                      Preço é obrigatório e deve ser maior que zero
                    </small>
                  </div>

                  <!-- Estoque -->
                  <div class="space-y-4">
                    <label for="estoque" class="block text-lg font-semibold text-gray-700">
                      Quantidade em Estoque *
                    </label>
                    <p-inputNumber
                      id="estoque"
                      formControlName="estoque"
                      placeholder="0"
                      [min]="0"
                      styleClass="w-full"
                      inputStyleClass="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500"
                      [class.border-red-300]="productForm.get('estoque')?.invalid && productForm.get('estoque')?.touched">
                    </p-inputNumber>
                    <small 
                      class="text-red-500 font-medium text-base" 
                      *ngIf="productForm.get('estoque')?.invalid && productForm.get('estoque')?.touched">
                      Estoque é obrigatório
                    </small>
                  </div>
                </div>
              </div>

              <p-divider></p-divider>

              <!-- Imagem e Status -->
              <div class="space-y-8">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="w-3 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                  <h3 class="text-2xl font-bold text-gray-800">Imagem e Status</h3>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- URL da Imagem -->
                  <div class="space-y-4">
                    <label for="imagemUrl" class="block text-lg font-semibold text-gray-700 flex items-center">
                      <i class="pi pi-image mr-3 text-purple-600"></i>
                      URL da Imagem
                    </label>
                    <input 
                      id="imagemUrl"
                      type="url" 
                      pInputText 
                      formControlName="imagemUrl"
                      placeholder="https://exemplo.com/imagem.jpg"
                      class="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300">
                    <small class="text-gray-500 text-base">
                      Adicione uma URL válida para a imagem do produto
                    </small>
                  </div>

                  <!-- Status Ativo -->
                  <div class="space-y-4">
                    <label class="block text-lg font-semibold text-gray-700">
                      Status do Produto
                    </label>
                    <div class="flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                      <p-inputSwitch 
                        id="ativo"
                        formControlName="ativo"
                        styleClass="scale-125">
                      </p-inputSwitch>
                      <div>
                        <p class="font-bold text-gray-800 text-lg">
                          {{ productForm.get('ativo')?.value ? 'Produto Ativo' : 'Produto Inativo' }}
                        </p>
                        <p class="text-gray-600">
                          {{ productForm.get('ativo')?.value ? 'Visível na loja' : 'Oculto na loja' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Preview da Imagem -->
                <div *ngIf="productForm.get('imagemUrl')?.value" class="mt-8">
                  <label class="block text-lg font-semibold text-gray-700 mb-4">
                    Preview da Imagem
                  </label>
                  <div class="relative inline-block">
                    <img 
                      [src]="productForm.get('imagemUrl')?.value" 
                      [alt]="productForm.get('nome')?.value || 'Preview'"
                      class="w-48 h-48 object-cover rounded-2xl shadow-xl border-4 border-white"
                      (error)="onImageError($event)">
                    <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>

              <!-- Botões de Ação -->
              <div class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-6 pt-10 border-t-2 border-gray-100">
                <p-button 
                  label="Cancelar" 
                  severity="secondary"
                  [outlined]="true"
                  (onClick)="onCancel()"
                  class="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                  <i class="pi pi-times mr-2"></i>
                </p-button>
                
                <p-button 
                  [label]="isEditMode ? 'Atualizar Produto' : 'Criar Produto'" 
                  type="submit"
                  [disabled]="productForm.invalid || isSubmitting"
                  [loading]="isSubmitting"
                  class="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border-0 hover:scale-105 transition-all duration-300">
                  <i [class]="isEditMode ? 'pi pi-check' : 'pi pi-plus'" class="mr-2" *ngIf="!isSubmitting"></i>
                </p-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <p-toast position="top-right"></p-toast>
  `,
})
export class ProductFormComponent implements OnInit {
  @Input() product?: any
  @Output() save = new EventEmitter<any>() 
  @Output() cancel = new EventEmitter<void>() 

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
    // Se receber produto via @Input, preenche o formulário e ativa modo edição
    if (this.product) {
      this.isEditMode = true
      this.productForm.patchValue(this.product)
    }

    // Se for usado via rota, mantém o comportamento antigo
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
      preco: [null, [Validators.required, Validators.min(0.01)]],
      categoria: ["", Validators.required],
      estoque: [null, [Validators.required, Validators.min(0)]],
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
            life: 5000,
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

      if (this.save.observers.length > 0) {
        this.save.emit(formData)
        this.isSubmitting = false
        return
      }

      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, formData).subscribe({
          next: (product) => {
            if (product) {
              this.messageService.add({
                severity: "success",
                summary: "Sucesso!",
                detail: "Produto atualizado com sucesso",
                life: 3000,
              })
              setTimeout(() => this.router.navigate(["/produtos"]), 1500)
            }
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao atualizar produto",
              life: 5000,
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
              life: 3000,
            })
            setTimeout(() => this.router.navigate(["/produtos"]), 1500)
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao criar produto",
              life: 5000,
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
        life: 5000,
      })

      Object.keys(this.productForm.controls).forEach((key) => {
        this.productForm.get(key)?.markAsTouched()
      })
    }
  }

  onCancel() {
    if (this.cancel.observers.length > 0) {
      this.cancel.emit()
      return
  }
    this.router.navigate(["/produtos"])
  }

  onImageError(event: any) {
    event.target.src = "/placeholder.svg?height=192&width=192"
  }
}
