import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: { tokenGetter: () => localStorage.getItem('currentUser') 
      ? JSON.parse(localStorage.getItem('currentUser')!).token : null } }
  ]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: () => this.error = 'Usuário ou senha inválidos.'
    });
  }
}
