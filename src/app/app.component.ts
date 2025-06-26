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
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  title = "NexusStore"
}
