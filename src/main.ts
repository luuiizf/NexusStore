import { bootstrapApplication } from "@angular/platform-browser"
import { AppComponent } from "./app/app.component"
import { importProvidersFrom } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { routes } from "./app/app.routes"

// PrimeNG Configuration
import { providePrimeNG } from "primeng/config"
import Material from '@primeng/themes/aura';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule, RouterModule.forRoot(routes)),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          prefix: "p",
          darkModeSelector: "light",
          cssLayer: false,
        },
      },
    }),
  ],
}).catch((err) => console.error(err))
