// Importações necessárias do Angular e RxJS
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';

// Importação do Serviço de Autenticação e Interface UserProfile
import { AuthService, UserProfile } from '../services/auth.service';
import { of } from 'rxjs';

// Guarda de rota funcional para proteger rotas de administrador
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUserProfile().pipe(
    take(1),
    map((userProfile: UserProfile | null) => {
      if (!userProfile) {
        return router.createUrlTree(['/login']);
      }

      const isAdmin = userProfile.role === 'admin' && userProfile.status === 'aprovado';
      
      return isAdmin 
        ? true 
        : router.createUrlTree(['/login']);
    })
  );
};