import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Painel Administrativo</h1>
        <button
          (click)="showAddForm = true"
          class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Adicionar Produto
        </button>
      </div>

      <div *ngIf="showAddForm" class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Adicionar Novo Produto</h2>
        <app-product-form
          (save)="addProduct($event)"
          (cancel)="showAddForm = false"
        ></app-product-form>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estoque
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let product of products">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img [src]="product.image" [alt]="product.name" class="h-10 w-10 rounded-full object-cover">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">{{ product.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.price | currency:'BRL' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.stock }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  (click)="editProduct(product)"
                  class="text-primary-600 hover:text-primary-900 mr-4"
                >
                  Editar
                </button>
                <button
                  (click)="deleteProduct(product.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="editingProduct" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
          <h2 class="text-2xl font-bold mb-4">Editar Produto</h2>
          <app-product-form
            [product]="editingProduct"
            (save)="updateProduct($event)"
            (cancel)="editingProduct = null"
          ></app-product-form>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  showAddForm = false;
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products
    );
  }

  addProduct(product: Omit<Product, 'id'>): void {
    this.productService.createProduct(product).subscribe({
      next: () => {
        this.loadProducts();
        this.showAddForm = false;
      }
    });
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product.id, product).subscribe({
      next: () => {
        this.loadProducts();
        this.editingProduct = null;
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts()
      });
    }
  }
}