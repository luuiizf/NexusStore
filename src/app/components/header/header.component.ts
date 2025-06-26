import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { CommonModule } from "@angular/common"

 @Component({
  standalone: true,
  selector: "app-header",
  imports: [CommonModule, ToolbarModule, ButtonModule],
  template: `
    <div class="fixed top-0 left-0 w-full z-[9999] bg-transparent">
      <div class="container mx-auto px-4">
        <p-toolbar class="border-0 bg-white shadow-none py-4">
          <div class="p-toolbar-group-start">
            <div class="flex items-center space-x-4 cursor-pointer" (click)="navigateHome()">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-md">
                <i class="pi pi-shopping-bag text-white text-2xl"></i>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NexusStore
                </h1>
                <p class="text-sm text-gray-500 font-medium">E-commerce Moderno</p>
              </div>
            </div>
          </div>

          <div class="p-toolbar-group-end">
            <div class="flex items-center space-x-3">
              <p-button 
                label="Dashboard" 
                [text]="true"
                severity="secondary"
                icon="pi pi-chart-line"
                (onClick)="navigateHome()"
                class="hidden lg:block hover:bg-blue-50 transition-all duration-300 rounded-xl">
              </p-button>

              <p-button 
                label="Produtos" 
                [text]="true"
                severity="secondary"
                icon="pi pi-box"
                (onClick)="navigateToProducts()"
                class="hidden md:block hover:bg-purple-50 transition-all duration-300 rounded-xl">
              </p-button>

              <p-button 
                label="Novo Produto" 
                severity="primary"
                icon="pi pi-plus"
                (onClick)="navigateToNewProduct()"
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3">
              </p-button>
            </div>
          </div>
        </p-toolbar>
      </div>
    </div>
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
