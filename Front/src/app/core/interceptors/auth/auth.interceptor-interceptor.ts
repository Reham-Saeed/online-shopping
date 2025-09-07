import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const _AuthService = inject(AuthService);
  const token = _AuthService.getToken();

  const cloned = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true,
  });

  return next(cloned);
};
