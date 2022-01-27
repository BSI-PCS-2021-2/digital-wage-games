import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private notificationService: NotificationService,
    private walletService: WalletService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.username = this.authenticationService.getUsername();
    this.walletService.getWallet(this.username).subscribe((w) => {
      this.funds = w.funds;
    });
    if (this.router.snapshot.paramMap.get('success')) {
      this.notificationService.success('Sua compra foi realizada com sucesso!');
    }
  }

  buyCredits(): void {
    console.log('teste');
    let dialogRef = this.dialog.open(BuyCreditsComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  formatPrice(v: number) {
    return (v / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getAvatar() {
    if (this.authenticationService.getAvatar()) {
      return this.authenticationService.getAvatar();
    }
    return 'assets/images/dwg-large.png';
  }

  funds: number;
  username: string;
}
