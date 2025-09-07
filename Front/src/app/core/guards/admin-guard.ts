import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanMatchFn = (route, segments) => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);
  const user = _AuthService.getUserData();
  if (user && user.role === 'admin') {
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
