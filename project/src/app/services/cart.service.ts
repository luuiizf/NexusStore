import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor(private storage: LocalStorageService) {
    const storedCart = this.storage.retrieve('cart') || [];
    this.cartItems.next(storedCart);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity }]);
    }

    this.storage.store('cart', this.cartItems.value);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.storage.store('cart', updatedItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.next(updatedItems);
    this.storage.store('cart', updatedItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.storage.clear('cart');
  }

  getTotal(): Observable<number> {
    return this.cartItems.pipe(
      map(items => items.reduce(
        (total, item) => total + (item.product.price * item.quantity), 
        0
      ))
    );
  }
}