import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak: any;
  private isInitialized = false; // Nueva bandera para evitar reinicializaciones

  constructor(@Inject(PLATFORM_ID) private platformId: any) { 
    console.log('Keycloak service...');

    if (isPlatformBrowser(this.platformId)) {
      this.loadKeycloak(); // Asegurar carga antes de usar init()
    }
  }

  private async loadKeycloak(): Promise<void> {
    try {
      const Keycloak = await import('keycloak-js'); 

      this.keycloak = new Keycloak.default({
        url: 'https://localhost:8443/', 
        realm: 'inventory',
        clientId: 'angular-client',
      });

      await this.init(); // Llamar init() después de la carga
    } catch (error) {
      console.error('Keycloak service - error cargando Keycloak:', error);
    }
  }

  async init(): Promise<boolean> {
    console.log('Keycloak service - init...');

    if (!this.keycloak) {
      console.warn('keycloak service - esperando la inicialización de Keycloak...');

      await new Promise(resolve => setTimeout(resolve, 500)); // Esperar un poco si no está inicializado
      
      if (!this.keycloak) return false; // Si aún no está listo, abortar
    }

    if (this.isInitialized) {
      return true; // Evita que se inicialice varias veces
    }

    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required', // Puede ser 'login-required' o 'check-sso'
        checkLoginIframe: false, // Recomendado deshabilitar para SSR
        pkceMethod: 'S256', // Recomendado para seguridad en OAuth 2.0
        redirectUri: window.location.origin // Asegura que redirige a la URL correcta después del login
      });

      console.log('Keycloak service -  usuario autenticado:', authenticated);

      this.isInitialized = true;

      return authenticated;
    } catch (error) {
      console.error('Keycloak service - error al inicializar Keycloak:', error);
      return false;
    }
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }

  getUsername(): string | undefined {
    return this.keycloak?.tokenParsed?.preferred_username;
  }

  async login(): Promise<void> {
    if (!this.keycloak) {
      console.error('Keycloak service -  keycloak no está inicializado.');
      return;
    }

    if (this.keycloak) {
      await this.keycloak.login({
        redirectUri: window.location.origin + '/dashboard' // Redirige correctamente después del login
      });
    }
  }

  logout(): void {
    if (!this.keycloak) {
      console.error('Keycloak service - keycloak no está inicializado.');
      return;
    }

    this.keycloak.logout();
  }

  isAuthenticated(): boolean {
    if (!this.keycloak) {
      console.error('Keycloak service - keycloak no está inicializado.');
      return false;
    }

    // Verificar si el token de Keycloak existe y está disponible
    if (this.keycloak?.token) {
      // Verifica si el token está disponible y no ha expirado
      const expiresAt = this.keycloak.tokenParsed?.exp; // La fecha de expiración del token
      
      if (expiresAt) {
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        
        return expiresAt > currentTime; // Si el token no ha expirado, el usuario está autenticado
      }
    }

    return false; // Si no hay token o el token ha expirado
  }
}
