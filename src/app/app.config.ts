import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { ConfigService } from "./modules/shared/services/config.service";
import { provideHttpClient, withInterceptorsFromDi  } from "@angular/common/http";
import { AuthServiceService } from "./modules/shared/services/auth-service.service";

export function initializeKeycloak(authService: AuthServiceService): () => Promise<void> {
  /*return async () => {
    const authenticated = await authService.init();

    if (!authenticated) {
      console.warn('No autenticado en Keycloak, ir al login...');
      await authService.login();
    }
  };*/
  return async () => {
    try {
      const authenticated = await authService.init();
      
      console.log('Keycloak inicializado:', authenticated);
    } catch (error) {
      console.error('Error en la inicialización de Keycloak:', error);
    }
  };
}

export function initializeConfig(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Mejor práctica en Angular 19
    {
      provide: APP_INITIALIZER, //'appConfigInitializer',
      useFactory: initializeKeycloak,
      deps: [AuthServiceService],
      multi: true // Asegura que la promesa se ejecute antes de arrancar
    }
  ]
};