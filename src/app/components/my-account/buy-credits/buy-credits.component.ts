import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MyAccountComponent } from '../my-account.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { Wallet } from 'src/app/shared/models/wallet.model';
import { PutWallerDTO } from 'src/app/shared/models/dto/putWallet.dto';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.scss']
})
export class BuyCreditsComponent implements OnInit {

  ngOnInit(): void {
    this.clientId = this.authenticationService.getUserId();
    this.username = this.authenticationService.getUsername();
    console.log(this.clientId)
    this.walletService.getWallet(this.username).subscribe(w => {
      this.wallet = {
        id: w.id,
        userId: w.userId,
        funds: w.funds
      }
      this.walletFunds = w.funds;
    });
  }

  constructor(
    public dialogRef: MatDialogRef<BuyCreditsComponent>,
    public authenticationService: AuthenticationService,
    public walletService: WalletService,
    public router: Router)
    { }

  formatPrice(v: number) {
    return (v/100).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  cancel(): void {
    this.dialogRef.close();
  }

  setValueToIncrease(value: any) {
    this.wallet.funds = this.walletFunds + parseInt(value);
  }

  updateInput(event: any) {
    if (!Number.isInteger(parseInt(event.target.value))) return;
    this.setValueToIncrease(event.target.value * 100);
  }

  finishPurshase() {
    this.walletService.putWallet({
      value: this.wallet.funds,
      walletId: this.wallet.id
    })
    this.cancel();
    this.router.navigate(["/minha-conta/success"]);
  }

  wallet: Wallet;
  walletFunds: number;
  valueToIncrease: number;
  paymentType: string;
  clientId: string;
  username: string;

}
