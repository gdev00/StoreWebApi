import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductRequest } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly API = environment.apiUrl;

  constructor(private http: HttpClient) { }
    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`/api/Product`);
    }

    getproduct(id: number): Observable<Product> {
      return this.http.get<Product>(`/api/Product/${id}`);
    }

    updateProduct(id: number, request: ProductRequest): Observable<Product> {
      return this.http.put<Product>(`/api/Product/${id}`, request);
    }

    addProduct(request: ProductRequest): Observable<Product[]> {
      return this.http.post<Product[]>(`/api/Product`, request);
    }

    deleteProduct(id: number): Observable<Product> {
      return this.http.delete<Product>(`/api/Product/${id}`);
    }
  }

