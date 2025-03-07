import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { ConfigService } from "./modules/shared/services/config.service";
import { provideHttpClient, withInterceptorsFromDi  } from "@angular/common/http";
import { AuthService } from "./modules/shared/services/auth.service";

export function initializeKeycloak(authService: AuthService): () => Promise<void> {
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
      deps: [AuthService],
      multi: true // Asegura que la promesa se ejecute antes de arrancar
    }
  ]
};