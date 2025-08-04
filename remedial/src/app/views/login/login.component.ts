import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, PasswordModule, ButtonModule, FormsModule, MessageModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  successMessage: string | undefined = undefined;
  errorMessage: string | undefined = undefined;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Inicio de sesión exitoso';
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }
}