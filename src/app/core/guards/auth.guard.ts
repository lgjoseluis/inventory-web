import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthServiceService } from '../../modules/shared/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    console.log('Verificando autenticación...');

    const isAuthenticated = await this.authService.init(); // Esperar inicialización

    if (isAuthenticated && this.authService.getToken()) {
      return true;
    }     
    
    console.warn('Token no encontrado, redirigiendo al login...');

    await this.authService.login(); // Redirige a Keycloak

    return false;    
  }
}
