import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/shared/models/wallet.model';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
  }


  public wallet: Wallet;

}
