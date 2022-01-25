import { Product } from '../models/product/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { ProductRegistrationDTO } from '../models/dto/product/productRegistrationDTO';
import { PutProductDTO } from '../models/dto/product/putProduct.dto';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products: Product[];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/store/products`);
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/store/product/${productId}`);
  }

  postProduct(dto: ProductRegistrationDTO): Observable<number[]> {
    return this.http.post<number[]>(`${environment.baseUrl}/store/product`, dto);
  }

  putProduct(dto: PutProductDTO): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/store/product`, dto);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/store/product/${productId}`);
  }
}
