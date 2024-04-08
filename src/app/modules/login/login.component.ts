import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpContextToken } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [AuthService,HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage = '';

  

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.errorMessage  = ''; // Очищаем предыдущие сообщения об ошибке
    this.authService.login({
      UserLogin: this.username,
      UserPassword: this.password
    }  )
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          document.location.href = '/tasks';
          //this.router.navigate(['/tasks']);
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
  }
}
