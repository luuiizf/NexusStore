import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4">
      <header class="text-center my-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Bem-vindo à NexusStore</h1>
        <p class="text-xl text-gray-600">Descubra nossos produtos incríveis</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let product of products" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img [src]="product.image" [alt]="product.name" class="w-full h-48 object-cover">
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-900">{{ product.name }}</h2>
            <p class="text-gray-600 mt-2">{{ product.description }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-2xl font-bold text-primary-600">
                {{ product.price | currency:'BRL' }}
              </span>
              <button 
                (click)="addToCart(product)"
                class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}