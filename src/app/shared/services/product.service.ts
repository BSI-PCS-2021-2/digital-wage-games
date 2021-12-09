import { Product } from '../../../app/shared/models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products: Product[];

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getProducts(): Product[] {
    this.http.get<Product[]>(`${environment.baseUrl}/store/products`)
                    .subscribe(
                      products => {
                        products.forEach(product => {
                          let price = Number(product.price)/100;
                          product.price = "R$ "+ price.toString().replace('.', ',');
                          console.log(product.price);
                        });
                        this.products = products
                      },
                      error => {
                        this.notificationService.error('Ocorreu um erro!');
                        throw new Error(error)
                      }
                    );
                    return this.products;
  }

}
