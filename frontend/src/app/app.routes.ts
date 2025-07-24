import type { Routes } from "@angular/router"
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/produtos",
    pathMatch: "full",
  },
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then(m => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./components/register/register.component").then(m => m.RegisterComponent)
  },
  {
    path: "produtos",
    loadComponent: () => import("./components/product-list/product-list.component").then((m) => m.ProductListComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "produtos/novo",
    loadComponent: () => import("./components/product-form/product-form.component").then((m) => m.ProductFormComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "produtos/editar/:id",
    loadComponent: () => import("./components/product-form/product-form.component").then((m) => m.ProductFormComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "produtos/:id",
    loadComponent: () => import("./components/product-detail/product-detail.component").then((m) => m.ProductDetailComponent),
    canActivate: [AuthGuard],
  },
]
