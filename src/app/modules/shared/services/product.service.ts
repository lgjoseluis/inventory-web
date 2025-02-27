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

  getProductByName(name:string){
    const endpoint = `${apiUrl}/v1/products/search?name=${name}`;

    return this.http.get(endpoint);
  }

  saveProduct(body:any){
    const endpoint = `${apiUrl}/v1/products`;

    return this.http.post(endpoint, body);
  }

  updateProduct(body:any, id:number){
    const endpoint = `${apiUrl}/v1/products/${id}`;

    return this.http.put(endpoint, body);
  }
}
