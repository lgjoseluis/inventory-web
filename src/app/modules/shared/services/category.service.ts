import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';

const apiUrl: String = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class CategoryService { 
  private http = inject(HttpClient); // Nueva inyección en Angular 19
  private config = inject(ConfigService);

  constructor() {    
    // TODO: Lectura del archivo json
    console.log('API URL', this.config.apiUrl);
  }
 
  getCategories(){
    const endpoint = `${apiUrl}/v1/categories`;

    return this.http.get(endpoint);
  }
}
