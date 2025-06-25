import { Component } from "@angular/core"
import type { Router } from "@angular/router"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule],
  template: `
    <p-toolbar class="border-b-2 border-primary-100">
      <div class="p-toolbar-group-start">
        <h1 class="text-2xl font-bold text-primary-700 cursor-pointer" 
            (click)="navigateHome()">
          🛒 NexusStore
        </h1>
      </div>
      
      <div class="p-toolbar-group-end">
        <p-button 
          label="Produtos" 
          icon="pi pi-list" 
          [text]="true"
          (onClick)="navigateToProducts()"
          class="mr-2">
        </p-button>
        <p-button 
          label="Novo Produto" 
          icon="pi pi-plus" 
          (onClick)="navigateToNewProduct()">
        </p-button>
      </div>
    </p-toolbar>
  `,
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(["/produtos"])
  }

  navigateToProducts() {
    this.router.navigate(["/produtos"])
  }

  navigateToNewProduct() {
    this.router.navigate(["/produtos/novo"])
  }
}
