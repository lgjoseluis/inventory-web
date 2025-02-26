import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const apiUrl: String = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http=inject(HttpClient);

  constructor() { }

  getProducts(){
    const endpoint = `${apiUrl}/v1/products`;

    return this.http.get(endpoint);
  }
}
