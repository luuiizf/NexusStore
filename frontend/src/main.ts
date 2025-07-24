import { bootstrapApplication } from "@angular/platform-browser"
import { AppComponent } from "./app/app.component"
import { importProvidersFrom } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"
import { routes } from "./app/app.routes"
import { appConfig } from "./app/app.config"

// PrimeNG Configuration
import { providePrimeNG } from "primeng/config"
import Material from "@primeng/themes/aura"

bootstrapApplication(AppComponent, appConfig)

.catch((err) => console.error(err))
