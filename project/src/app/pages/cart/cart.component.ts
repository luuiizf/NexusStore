import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Seu Carrinho</h1>

      <div *ngIf="(cartItems$ | async)?.length; else emptyCart" class="grid grid-cols-1 gap-6">
        <div *ngFor="let item of cartItems$ | async" class="bg-white rounded-lg shadow p-6 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img [src]="item.product.image" [alt]="item.product.name" class="w-20 h-20 object-cover rounded">
            <div>
              <h3 class="text-lg font-semibold">{{ item.product.name }}</h3>
              <p class="text-gray-600">{{ item.product.price | currency:'BRL' }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <button 
                (click)="updateQuantity(item.product.id, item.quantity - 1)"
                [disabled]="item.quantity <= 1"
                class="text-gray-500 hover:text-primary-600 disabled:opacity-50"
              >
                -
              </button>
              <span class="w-8 text-center">{{ item.quantity }}</span>
              <button 
                (click)="updateQuantity(item.product.id, item.quantity + 1)"
                class="text-gray-500 hover:text-primary-600"
              >
                +
              </button>
            </div>
            
            <button 
              (click)="removeFromCart(item.product.id)"
              class="text-red-600 hover:text-red-700"
            >
              Remover
            </button>
          </div>
        </div>

        <div class="mt-8 bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-semibold">Total:</span>
            <span class="text-2xl font-bold text-primary-600">{{ total$ | async | currency:'BRL' }}</span>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button 
              (click)="clearCart()"
              class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpar Carrinho
            </button>
            <a 
              routerLink="/checkout"
              class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Finalizar Compra
            </a>
          </div>
        </div>
      </div>

      <ng-template #emptyCart>
        <div class="text-center py-12">
          <h2 class="text-2xl font-semibold text-gray-600 mb-4">Seu carrinho está vazio</h2>
          <p class="text-gray-500 mb-8">Adicione alguns produtos para começar suas compras!</p>
          <a 
            routerLink="/"
            class="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Continuar Comprando
          </a>
        </div>
      </ng-template>
    </div>
  `
})
export class CartComponent {
  cartItems$ = this.cartService.getCartItems();
  total$ = this.cartService.getTotal();

  constructor(private cartService: CartService) {}

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}