import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(payload: any) {
    return this.http.post<any>(`${this.API_URL}/login`, payload);
  }

  register(payload: any, role: 'grad' | 'pm') {
    return this.http.post<any>(`${this.API_URL}/register/${role}`, payload);
  }

  logout() {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    localStorage.removeItem('avatarUrl');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }
} 