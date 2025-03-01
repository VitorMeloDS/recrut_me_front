import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!state.url.includes('login')) {
    return authService.isAuthenticate().pipe(
      map((isAuth) => {
        const token = localStorage.getItem('token');

        if (token && isAuth && state.url.includes('login')) {
          router.navigate(['/perfil']);
          return true;
        }

        if (token && isAuth && !state.url.includes('login')) {
          return true;
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          router.navigate(['/login']);
          return false;
        }
      }),
      catchError((err) => {
        console.log(err);

        router.navigate(['/login']);
        return of(false);
      })
    );
  }

  return true;
};
