import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private keycloak: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) { 
    console.log('Keycloak service...');

    if (isPlatformBrowser(this.platformId)) {
      import('keycloak-js').then(Keycloak => {
        this.keycloak = new Keycloak.default({
          url: 'https://localhost:8443/', 
          realm: 'inventory',
          clientId: 'angular-client',
        });
      });

      //this.init();
    }
  }

  async init(): Promise<boolean> {
    console.log('Init keycloak..');

    if (!this.keycloak) {
      console.warn('Keycloak no está disponible en el servidor');
      return false;
    }

    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required', // Puede ser 'login-required' o 'check-sso'
        checkLoginIframe: false, // Recomendado deshabilitar para SSR
        pkceMethod: 'S256' // Recomendado para seguridad en OAuth 2.0
      });

      if (!authenticated) {
        console.warn('No autenticado en Keycloak, redirigiendo al login...');
        await this.login(); // Redirigir manualmente
      }

      console.log('Usuario autenticado:', authenticated);

      return authenticated;
    } catch (error) {
      console.error('Error al inicializar Keycloak:', error);
      return false;
    }
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.sub;
  }

  async login(): Promise<void> {
    if (this.keycloak) {
      await this.keycloak.login();
    }
  }

  logout(): void {
    this.keycloak.logout();
  }
}
