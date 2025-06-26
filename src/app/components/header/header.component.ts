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
    <div class="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-gray-200 shadow-xl">
      <div class="container mx-auto px-4">
        <p-toolbar class="border-0 bg-transparent shadow-none py-4">
          <div class="p-toolbar-group-start">
            <div class="flex items-center space-x-4 cursor-pointer group" (click)="navigateHome()">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div class="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                  <i class="pi pi-shopping-bag text-white text-3xl"></i>
                </div>
              </div>
              <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                (onClick)="navigateHome()"
                class="hidden lg:block hover:bg-blue-50 transition-all duration-300 rounded-xl">
                <i class="pi pi-chart-line mr-2 text-blue-600"></i>
              </p-button>
              
              <p-button 
                label="Produtos" 
                [text]="true"
                severity="secondary"
                (onClick)="navigateToProducts()"
                class="hidden md:block hover:bg-purple-50 transition-all duration-300 rounded-xl">
                <i class="pi pi-box mr-2 text-purple-600"></i>
              </p-button>
              
              <p-button 
                label="Novo Produto" 
                severity="primary"
                (onClick)="navigateToNewProduct()"
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3">
                <i class="pi pi-plus mr-2"></i>
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
