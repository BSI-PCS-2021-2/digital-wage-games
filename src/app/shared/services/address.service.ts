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

  getAddressesByClient(clientId: number): Map<number, Address> {
    const addresses: Map<number, Address> = new Map();
    this.http.get<Address[]>(`${environment.baseUrl}/clients/user/${clientId}/addresses`).subscribe((a) => {
      a.forEach(e => {
        addresses.set(e.id, {
          id: e.id,
          city: e.city,
          street: e.street,
          district: e.district,
          postalCode: e.postalCode,
          additionalInfo: e.additionalInfo,
          number: e.number,
          state: e.state
        })
      }) 
    })
    return addresses;
  }
}
