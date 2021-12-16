import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient) { }

  getAddressesByClient(clientId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${environment.baseUrl}/clients/user/${clientId}/addresses`)
      
  }
}
