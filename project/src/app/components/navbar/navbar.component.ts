import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-primary-600">NexusStore</h1>
            </a>
          </div>
          
          <div class="flex items-center space-x-4">
            <a routerLink="/carrinho" class="relative">
              <span class="sr-only">Carrinho</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span *ngIf="cartItemCount$ | async as count" class="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {{ count }}
              </span>
            </a>
            
            <ng-container *ngIf="isAuthenticated$ | async; else loginButton">
              <button (click)="logout()" class="text-gray-600 hover:text-primary-600">
                Sair
              </button>
              <a *ngIf="isAdmin$ | async" routerLink="/admin" class="text-gray-600 hover:text-primary-600">
                Admin
              </a>
            </ng-container>
            
            <ng-template #loginButton>
              <a routerLink="/login" class="text-gray-600 hover:text-primary-600">
                Entrar
              </a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  isAdmin$ = this.authService.currentUser$.pipe(
    map(user => user?.role === 'admin')
  );
  cartItemCount$ = this.cartService.getCartItems().pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  logout(): void {
    this.authService.logout();
  }
}