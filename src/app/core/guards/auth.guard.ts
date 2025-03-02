import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthServiceService } from '../../modules/shared/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const authenticated = await this.authService.init(); // Asegurar autenticación
    
    if (!authenticated) {
      console.warn('Usuario no autenticado. Redirigiendo al login...');
      await this.authService.login(); // Redirige a Keycloak
      return false;
    }

    return true;
  }
}
