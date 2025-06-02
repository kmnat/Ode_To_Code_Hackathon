import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'card-fancy-example',
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
    HttpClientModule
  ],
})
export class LoginComponent {
//   isSignUp = false;

//   loginData = { soeid: '', password: '' };
//   // signupData = { soeid: '', password: '', confirmPassword: '', role: 'grad' };
//   signupData = {
//   name: '',              // full name
//   soeid: '',             // SOEID
//   password: '',
//   confirmPassword: '',
//   role: 'grad'
// };

//   constructor(private http: HttpClient, private router: Router) {}

//   handleSubmit() {
//     if (this.isSignUp) {
//       this.onSignupSubmit();
//     } else {
//       this.onLoginSubmit();
//     }
//   }

//   toggleForm(): void {
//     this.isSignUp = !this.isSignUp;
//   }

//   onSignupSubmit() {
//   if (this.signupData.password !== this.signupData.confirmPassword) {
//     alert('Passwords do not match!');
//     return;
//   }

//   const registerUrl =
//     this.signupData.role === 'grad'
//       ? 'http://localhost:5000/auth/register/grad'
//       : 'http://localhost:5000/auth/register/pm';

//   const payload = {
//     _id: this.signupData.soeid,
//     name: this.signupData.soeid,
//     password: this.signupData.password,
//   };
// //   const payload = {
// //   _id: this.signupData.soeid,
// //   password: this.signupData.password,
// // };


//   this.http.post(registerUrl, payload).subscribe({
//     next: () => {
//       alert('Registered successfully! Please login.');
//       this.toggleForm();
//     },
//     error: (err) => {
//       alert('Registration failed: ' + (err.error?.error || err.message));
//     },
//   });
// }

// onLoginSubmit() {
//   const payload = {
//     _id: this.loginData.soeid,
//     password: this.loginData.password,
//   };

//   this.http.post('http://localhost:5000/auth/login', payload).subscribe({
//     next: (res: any) => {
//       localStorage.setItem('token', res.token);
//       localStorage.setItem('name', res.name);
//       localStorage.setItem('role', res.role);

//       alert(`Welcome ${res.name}! Redirecting you...`);
//       this.router.navigate(['/dashboard']);
//     },
//     error: (err) => {
//       alert('Login failed: ' + (err.error?.error || err.message));
//     },
//   });
// }

isSignUp = false;

  loginData = { soeid: '', password: '' };
  signupData = {
    name: '',
    soeid: '',
    password: '',
    confirmPassword: '',
    role: 'grad'
  };

  constructor(private http: HttpClient, private router: Router) {}

  handleSubmit() {
    if (this.isSignUp) {
      this.onSignupSubmit();
    } else {
      this.onLoginSubmit();
    }
  }

  toggleForm(): void {
    this.isSignUp = !this.isSignUp;
  }

  onSignupSubmit() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const registerUrl =
      this.signupData.role === 'grad'
        ? 'http://localhost:5000/auth/register/grad'
        : 'http://localhost:5000/auth/register/pm';

    const payload = {
      _id: this.signupData.soeid,
      name: this.signupData.name || this.signupData.soeid,
      password: this.signupData.password,
    };

    this.http.post(registerUrl, payload).subscribe({
      next: () => {
        alert('Registered successfully! Please login.');
        this.toggleForm();
      },
      error: (err) => {
        alert('Registration failed: ' + (err.error?.error || err.message));
      },
    });
  }

  onLoginSubmit() {
    const payload = {
      _id: this.loginData.soeid,
      password: this.loginData.password,
    };

    this.http.post('http://localhost:5000/auth/login', payload).subscribe({
      next: (res: any) => {
        // Store JWT and user info in localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.name);
        localStorage.setItem('role', res.role);

        alert(`Welcome ${res.name}! Redirecting you...`);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Login failed: ' + (err.error?.error || err.message));
      },
    });
  }
}
