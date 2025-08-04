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
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, PasswordModule, ButtonModule, FormsModule, MessageModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  successMessage: string | undefined = undefined;
  errorMessage: string | undefined = undefined;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al registrar usuario';
      }
    });
  }
}