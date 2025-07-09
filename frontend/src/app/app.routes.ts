import type { Routes } from "@angular/router"

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/produtos",
    pathMatch: "full",
  },
  {
    path: "produtos",
    loadComponent: () => import("./components/product-list/product-list.component").then((m) => m.ProductListComponent),
  },
  {
    path: "produtos/novo",
    loadComponent: () => import("./components/product-form/product-form.component").then((m) => m.ProductFormComponent),
  },
  {
    path: "produtos/editar/:id",
    loadComponent: () => import("./components/product-form/product-form.component").then((m) => m.ProductFormComponent),
  },
  {
    path: "produtos/:id",
    loadComponent: () =>
      import("./components/product-detail/product-detail.component").then((m) => m.ProductDetailComponent),
  },
]
