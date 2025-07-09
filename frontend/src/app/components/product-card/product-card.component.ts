import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
    imports: [CommonModule]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() select = new EventEmitter<Product>();

  onSelect() {
    this.select.emit(this.product);
  }
}