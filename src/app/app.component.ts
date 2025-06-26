import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { HeaderComponent } from "./components/header/header.component"

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <app-header></app-header>
      
      <main class="container mx-auto pt-24 px-4 py-8">
        <h1 class="text-4xl text-red-600 font-bold text-center">Tailwind está funcionando!</h1>
        <router-outlet></router-outlet>
      </main>
      
      <!-- Background Decorations -->
      <div class="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-subtle" style="animation-delay: 4s;"></div>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = "NexusStore"
}