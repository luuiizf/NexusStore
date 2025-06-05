import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-bold mb-6">Informações de Entrega</h2>
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                type="text"
                formControlName="fullName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                formControlName="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Endereço</label>
              <input
                type="text"
                formControlName="address"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Cidade</label>
                <input
                  type="text"
                  formControlName="city"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">CEP</label>
                <input
                  type="text"
                  formControlName="zipCode"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Número do Cartão</label>
              <input
                type="text"
                formControlName="cardNumber"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="**** **** **** ****"
              >
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Validade</label>
                <input
                  type="text"
                  formControlName="cardExpiry"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="MM/AA"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  formControlName="cardCvv"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="123"
                >
              </div>
            </div>

            <button
              type="submit"
              [disabled]="checkoutForm.invalid || isLoading"
              class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {{ isLoading ? 'Processando...' : 'Finalizar Compra' }}
            </button>
          </form>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-6">Resumo do Pedido</h2>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="space-y-4">
              <div *ngFor="let item of cartItems$ | async" class="flex justify-between">
                <span>{{ item.product.name }} ({{ item.quantity }}x)</span>
                <span>{{ item.product.price * item.quantity | currency:'BRL' }}</span>
              </div>
              
              <div class="border-t pt-4">
                <div class="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{{ total$ | async | currency:'BRL' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cartItems$ = this.cartService.getCartItems();
  total$ = this.cartService.getTotal();
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cardCvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      
      // Simulação de processamento do pedido
      setTimeout(() => {
        this.cartService.clearCart();
        this.router.navigate(['/'], {
          queryParams: { orderSuccess: true }
        });
      }, 2000);
    }
  }
}