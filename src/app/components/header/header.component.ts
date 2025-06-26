import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { ToolbarModule } from "primeng/toolbar"
import { ButtonModule } from "primeng/button"
import { CommonModule } from "@angular/common"
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { 
  heroShoppingBag, 
  heroPlus, 
  heroListBullet,
  heroSparkles,
  heroHome
} from '@ng-icons/heroicons/outline'

@Component({
  standalone: true,
  selector: "app-header",
  imports: [CommonModule, ToolbarModule, ButtonModule, NgIconComponent],
  providers: [provideIcons({ 
    heroShoppingBag, 
    heroPlus, 
    heroListBullet,
    heroSparkles,
    heroHome
  })],
  template: `
    <div class="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-lg">
      <p-toolbar class="border-0 bg-transparent shadow-none">
        <div class="p-toolbar-group-start">
          <div class="flex items-center space-x-3 cursor-pointer group" (click)="navigateHome()">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div class="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <ng-icon name="heroShoppingBag" class="text-white text-2xl"></ng-icon>
              </div>
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
              label="Início" 
              [text]="true"
              severity="secondary"
              (onClick)="navigateHome()"
              class="hidden md:block">
              <ng-icon name="heroHome" class="mr-2"></ng-icon>
            </p-button>
            
            <p-button 
              label="Produtos" 
              [text]="true"
              severity="secondary"
              (onClick)="navigateToProducts()"
              class="hidden md:block">
              <ng-icon name="heroListBullet" class="mr-2"></ng-icon>
            </p-button>
            
            <p-button 
              label="" 
              severity="primary"
              (onClick)="navigateToNewProduct()"
              class="gradient-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <ng-icon name="heroPlus" class="mr-2"></ng-icon>
              <span class="hidden sm:inline">Novo Produto</span>
            </p-button>
          </div>
        </div>
      </p-toolbar>
    </div>
  `
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