import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any

  //private http = inject(HttpClient); // Inyección en Angular 19
  constructor(private http: HttpClient) {}
    
  async loadConfig(): Promise<void> {
    console.log('Intentando cargar configuración...');
    try {
      this.config = await firstValueFrom(this.http.get('/assets/config.json'));
      console.log('Configuración cargada correctamente:', this.config);
    } catch (error) {
      console.error('Error cargando configuración:', error);
    }
  }

  get apiUrl(): string {
    return this.config?.apiUrl || '';
  }
}
