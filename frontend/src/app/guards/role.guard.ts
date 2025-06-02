import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  private decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];
    if (decodedToken.role !== requiredRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
} 