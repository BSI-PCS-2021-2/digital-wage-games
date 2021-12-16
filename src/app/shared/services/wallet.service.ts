import { Product } from '../../../app/shared/models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Wallet } from '../models/wallet.model';
import { PutWallerDTO } from '../models/dto/putWallet.dto';


@Injectable({
  providedIn: 'root'
})

export class WalletService {
  wallet: Wallet;

  constructor(private http: HttpClient) { }

  getWallet(username: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${environment.baseUrl}/clients/wallets/${username}`);
  }

  putWallet(putWalletDTO: PutWallerDTO) {
    return this.http.put(`${environment.baseUrl}/clients/wallets`, putWalletDTO).subscribe();
  }
}


