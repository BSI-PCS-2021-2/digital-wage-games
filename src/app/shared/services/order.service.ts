import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { PostOrderDTO } from '../models/dto/postOrder.dto'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  postOrder(postOrderDTO: PostOrderDTO){ 
    return this.http.post<boolean>(`${environment.baseUrl}/store/order`, postOrderDTO).subscribe(); 
  }
}