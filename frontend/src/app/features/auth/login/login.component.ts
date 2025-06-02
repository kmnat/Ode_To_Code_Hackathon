import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

interface LoginData {
  soeid: string;
  password: string;
  role: 'grad' | 'pm';
}

interface SignupData extends LoginData {
  name: string;
  confirmPassword: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule
  ]
})
export class LoginComponent {
  isSignUp = false;
  avatars = [
    { url: 'assets/anime/samurai.webm', name: 'Samurai' },
    { url: 'assets/anime/Scarlet_Witch.webp', name: 'Scarlet Witch' }
  ];

  loginData: LoginData = {
    soeid: '',
    password: '',
    role: 'grad'
  };

  signupData: SignupData = {
    soeid: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'grad',
    avatarUrl: 'assets/anime/samurai.webm'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.isSignUp) {
      this.onSignupSubmit();
    } else {
      this.onLoginSubmit();
    }
  }

  onLoginSubmit() {
    const payload = {
      _id: this.loginData.soeid,
      password: this.loginData.password,
      role: this.loginData.role
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.name);
        localStorage.setItem('role', response.role);
        localStorage.setItem('avatarUrl', response.avatarUrl);

        // Redirect based on role
        if (response.role === 'pm') {
          this.router.navigate(['/pm']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        alert('Login failed: ' + (err.error?.error || err.message));
      },
    });
  }

  onSignupSubmit() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      _id: this.signupData.soeid,
      name: this.signupData.name,
      password: this.signupData.password,
      role: this.signupData.role,
      avatarUrl: this.signupData.avatarUrl
    };

    this.authService.register(payload, this.signupData.role).subscribe({
      next: () => {
        alert('Registered successfully! Please login.');
        this.toggleForm();
      },
      error: (err) => {
        alert('Registration failed: ' + (err.error?.error || err.message));
      },
    });
  }

  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }
}
