import { Product } from '../../../app/shared/models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient, private notificationService: NotificationService) { }


  getProduct():Observable<Product[]>{ 
    return this.http.get<Product[]>(`${environment.baseUrl}/store/products`);                 
  }
}
