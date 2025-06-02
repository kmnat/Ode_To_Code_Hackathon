import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp > now) {
        return true;
      } else {
        localStorage.clear(); // Optional: clear stale token
      }
    } catch (e) {
      console.error('Invalid token:', e);
      localStorage.clear();
    }
  }

  router.navigate(['/login']);
  return false;
};
