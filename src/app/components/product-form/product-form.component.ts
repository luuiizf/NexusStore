import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { ProductService } from "../../services/product.service"

// PrimeNG Imports
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { InputTextareaModule } from "primeng/inputtextarea"
import { InputNumberModule } from "primeng/inputnumber"
import { DropdownModule } from "primeng/dropdown"
import { InputSwitchModule } from "primeng/inputswitch"
import { ButtonModule } from "primeng/button"
import { ToastModule } from "primeng/toast"
import { MessageService } from "primeng/api"

@Component({
    selector: "app-product-form",
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
        DropdownModule,
        InputSwitchModule,
        ButtonModule,
        ToastModule,
    ],
    providers: [MessageService],
    template: `
    <div class="max-w-4xl mx-auto">
      <p-card>
        <ng-template pTemplate="header">
          <div class="p-4 border-b">
            <h2 class="text-2xl font-bold text-gray-800">
              {{ isEditMode ? 'Editar Produto' : 'Novo Produto' }}
            </h2>
            <p class="text-gray-600 mt-1">
              {{ isEditMode ? 'Atualize as informações do produto' : 'Adicione um novo produto ao catálogo' }}
            </p>
          </div>
        </ng-template>

        <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nome -->
            <div class="space-y-2">
              <label for="nome" class="block text-sm font-medium text-gray-700">
                Nome do Produto *
              </label>
              <input 
                id="nome"
                type="text" 
                pInputText 
                formControlName="nome"
                placeholder="Digite o nome do produto"
                class="w-full"
                [class.ng-invalid]="productForm.get('nome')?.invalid && productForm.get('nome')?.touched">
              <small 
                class="text-red-500" 
                *ngIf="productForm.get('nome')?.invalid && productForm.get('nome')?.touched">
                Nome é obrigatório
              </small>
            </div>

            <!-- Categoria -->
            <div class="space-y-2">
              <label for="categoria" class="block text-sm font-medium text-gray-700">
                Categoria *
              </label>
              <p-dropdown 
                id="categoria"
                formControlName="categoria"
                [options]="categorias"
                placeholder="Selecione uma categoria"
                class="w-full"
                [class.ng-invalid]="productForm.get('categoria')?.invalid && productForm.get('categoria')?.touched">
              </p-dropdown>
              <small 
                class="text-red-500" 
                *ngIf="productForm.get('categoria')?.invalid && productForm.get('categoria')?.touched">
                Categoria é obrigatória
              </small>
            </div>

            <!-- Preço -->
            <div class="space-y-2">
              <label for="preco" class="block text-sm font-medium text-gray-700">
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
                [class.ng-invalid]="productForm.get('preco')?.invalid && productForm.get('preco')?.touched">
              </p-inputNumber>
              <small 
                class="text-red-500" 
                *ngIf="productForm.get('preco')?.invalid && productForm.get('preco')?.touched">
                Preço é obrigatório e deve ser maior que zero
              </small>
            </div>

            <!-- Estoque -->
            <div class="space-y-2">
              <label for="estoque" class="block text-sm font-medium text-gray-700">
                Quantidade em Estoque *
              </label>
              <p-inputNumber
                id="estoque"
                formControlName="estoque"
                placeholder="0"
                [min]="0"
                class="w-full"
                [class.ng-invalid]="productForm.get('estoque')?.invalid && productForm.get('estoque')?.touched">
              </p-inputNumber>
              <small 
                class="text-red-500" 
                *ngIf="productForm.get('estoque')?.invalid && productForm.get('estoque')?.touched">
                Estoque é obrigatório
              </small>
            </div>

            <!-- URL da Imagem -->
            <div class="space-y-2 md:col-span-2">
              <label for="imagemUrl" class="block text-sm font-medium text-gray-700">
                URL da Imagem
              </label>
              <input 
                id="imagemUrl"
                type="url" 
                pInputText 
                formControlName="imagemUrl"
                placeholder="https://exemplo.com/imagem.jpg"
                class="w-full">
            </div>

            <!-- Descrição -->
            <div class="space-y-2 md:col-span-2">
              <label for="descricao" class="block text-sm font-medium text-gray-700">
                Descrição *
              </label>
              <textarea 
                id="descricao"
                pInputTextarea 
                formControlName="descricao"
                placeholder="Descreva o produto..."
                rows="4"
                class="w-full"
                [class.ng-invalid]="productForm.get('descricao')?.invalid && productForm.get('descricao')?.touched">
              </textarea>
              <small 
                class="text-red-500" 
                *ngIf="productForm.get('descricao')?.invalid && productForm.get('descricao')?.touched">
                Descrição é obrigatória
              </small>
            </div>

            <!-- Status Ativo -->
            <div class="space-y-2 md:col-span-2">
              <div class="flex items-center space-x-3">
                <label for="ativo" class="text-sm font-medium text-gray-700">
                  Produto Ativo
                </label>
                <p-inputSwitch 
                  id="ativo"
                  formControlName="ativo">
                </p-inputSwitch>
                <span class="text-sm text-gray-500">
                  {{ productForm.get('ativo')?.value ? 'Produto visível na loja' : 'Produto oculto na loja' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <p-button 
              label="Cancelar" 
              icon="pi pi-times" 
              severity="secondary"
              [text]="true"
              (onClick)="onCancel()">
            </p-button>
            <p-button 
              label="{{ isEditMode ? 'Atualizar' : 'Criar' }} Produto" 
              icon="pi pi-{{ isEditMode ? 'check' : 'plus' }}" 
              type="submit"
              [disabled]="productForm.invalid"
              [loading]="isSubmitting">
            </p-button>
          </div>
        </form>
      </p-card>
    </div>

    <p-toast></p-toast>
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
                summary: "Sucesso",
                detail: "Produto atualizado com sucesso",
              })
              setTimeout(() => this.router.navigate(["/produtos"]), 1500)
            }
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao atualizar produto",
            })
            this.isSubmitting = false
          },
        })
      } else {
        this.productService.createProduct(formData).subscribe({
          next: (product) => {
            this.messageService.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Produto criado com sucesso",
            })
            setTimeout(() => this.router.navigate(["/produtos"]), 1500)
          },
          error: () => {
            this.messageService.add({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao criar produto",
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
      })
    }
  }

  onCancel() {
    this.router.navigate(["/produtos"])
  }
}
