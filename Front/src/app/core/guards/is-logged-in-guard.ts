import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanMatchFn = (route, segments) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  if (_AuthService.isLoggedIn()) {
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
