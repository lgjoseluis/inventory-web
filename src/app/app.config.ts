import { ApplicationConfig } from "@angular/core";
import { ConfigService } from "./modules/shared/services/config.service";
import { provideHttpClient, withInterceptorsFromDi  } from "@angular/common/http";

export function initializeConfig(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Mejor práctica en Angular 19
    {
      provide: 'appConfigInitializer',
      useFactory: initializeConfig,
      deps: [ConfigService],
      multi: true // Asegura que la promesa se ejecute antes de arrancar
    }
  ]
};