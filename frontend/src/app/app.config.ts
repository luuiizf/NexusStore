import { ApplicationConfig, importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { providePrimeNG } from 'primeng/config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import Material from "@primeng/themes/aura"


export function tokenGetter() {
  return localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!).token
    : null;
}

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            BrowserAnimationsModule,
            RouterModule.forRoot(routes),
            HttpClientModule
        ),
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
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: { tokenGetter } }
    ],
};


// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     RegisterComponent
//   ],
//   imports: [
//     BrowserModule,
//     CommonModule,
//     FormsModule,
//     BrowserModule,
//     HttpClientModule,
//     JwtModule.forRoot({
//       config: {
//         tokenGetter: tokenGetter,
//         allowedDomains: ['localhost:8000'],
//         // disallowedRoutes: ['http://localhost:8000/api/login']
//       }
//     })
//   ],
//   providers: [
//     JwtHelperService,
//     { provide: JWT_OPTIONS, useValue: { tokenGetter } }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
