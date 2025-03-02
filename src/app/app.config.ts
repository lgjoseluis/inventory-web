import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { ConfigService } from "./modules/shared/services/config.service";
import { provideHttpClient, withInterceptorsFromDi  } from "@angular/common/http";
import { AuthServiceService } from "./modules/shared/services/auth-service.service";

export function initializeKeycloak(keycloak: AuthServiceService): () => Promise<void> {
  console.info('Initialize Keycloak....');

  return () => keycloak.init().then(authenticated => {
    if (!authenticated) {
      console.error('No autenticado en Keycloak');
    }
  });
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