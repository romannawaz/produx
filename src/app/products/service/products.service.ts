import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { v4 as uuid } from 'uuid';

import { Product, ProductChange, ProductCreate } from '@app/products/common';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url = 'http://localhost:3000';
  private readonly productsUrl = this.url + '/products';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  create(productCreate: ProductCreate): Observable<Product> {
    const product: Product = {
      ...productCreate,
      id: uuid(),
      views: 0,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    return this.http.post<Product>(this.productsUrl, product);
  }

  update(productChange: ProductChange): Observable<Product> {
    const product = {
      ...productChange,
      updatedAt: new Date().toString(),
    };

    return this.http.patch<Product>(`${this.productsUrl}/${productChange.id}`, product);
  }

  remove(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.productsUrl}/${id}`);
  }
}
