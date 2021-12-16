import { Component, OnInit, Injectable } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperIntl } from '@angular/material/stepper';
import { Product } from '../../../app/shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { Options } from '@angular-slider/ngx-slider';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { WalletService } from '../../shared/services/wallet.service';
import { Wallet } from '../../shared/models/wallet.model';


@Injectable()
export class StepperIntl extends MatStepperIntl {
  override optionalLabel = '(OPCIONAL)';
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit {

  public selected = 'relevant';

  public products: Product[];
  public wallet: Wallet;

  // implementar logica para preencher os icones de avaliação.

  rateArr = [1,2,3,4];

  minPriceValue: number = 0;
  maxPriceValue: number = 1000;
  priceOptions: Options = {
    floor: 0,
    ceil: 1000
  };

  minRatingValue: number = 0;
  maxRatingValue: number = 1000;
  ratingOptions: Options = {
    floor: 0,
    ceil: 5
  };

  constructor(
    private productService: ProductService,
    private walletService: WalletService,
    public authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.convert(this.products);
    });

    this.walletService.getWallet(this.authenticationService.getUsername()).subscribe((wallet: Wallet) => {
      this.wallet = wallet;
      this.wallet.funds = this.wallet.funds / 100;
    });
  }

  convert(products: Product[]): void {
    products.forEach(product => {
      let price = Number(product.price)/100;
      product.price = "R$ "+ price.toString().replace('.', ',');
      console.log(product.price + " 123");
    });
    this.products = products
  }

  addToCart(productId: number): void {
    if (this.authenticationService.isLoggedIn()) {
      this.notificationService.success('Produto adicionado ao carrinho');
    } else {
      this.notificationService.alert('Você precisa estar conectado');
      this.router.navigate(['/login']);
    }
  }

  goToCart(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/carrinho']);
    } else {
      this.notificationService.alert('Você precisa estar conectado');
      this.router.navigate(['/login']);
    }
  }

}
