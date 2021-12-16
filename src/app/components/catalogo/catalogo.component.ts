import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { MatStepperIntl } from '@angular/material/stepper';
import { Product } from '../../../app/shared/models/product.model';
import { PostCartItemDTO } from '../../../app/shared/models/dto/cartItem/postCartItem.dto';
import { ProductService } from '../../shared/services/product.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NotificationService } from '../../shared/services/notification.service';
import { WalletService } from '../../shared/services/wallet.service';
import { Wallet } from '../../shared/models/wallet.model';

import { CartService } from '../../shared/services/cart.service';
import { Options } from '@angular-slider/ngx-slider';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class StepperIntl extends MatStepperIntl {
  override optionalLabel = '(OPCIONAL)';
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit, AfterViewInit {

  constructor(private productService: ProductService,
              public authenticationService: AuthenticationService,
              private walletService: WalletService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.cartId = this.authenticationService.getCartId();
    this.getProducts();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.defineProductsOnCart();
    }, 200);

    if (this.cartId !== null) {
      this.activeLoggedButtons();
    }

    if (this.authenticationService.isLoggedIn()) {
      document.getElementById("main-cart-button").classList.add('active');
    }
  }

  defineProductsOnCart() {

      this.cartService.getCartItems(this.cartId).subscribe((cartItems)  => {
        cartItems.forEach(e => {
          document.getElementById(`cart_actions_container_${e.productId}`).classList.add('active');
          this.cartSize++;
        })
      });

  }

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.walletService.getWallet(this.authenticationService.getUsername()).subscribe((wallet: Wallet) => {
      this.wallet = wallet;
      this.wallet.funds = this.wallet.funds / 100;
    });
  }

  activeLoggedButtons() {
    document.getElementsByClassName("cart-button")[0].classList.add('active');
  }

  formatPrice(v: number) {
    return `R$ ${(v)}`.replace('.', ',');
  }

  postCartItem(productId: number) {
    const postCartItemDTO: PostCartItemDTO = {
      cartId: this.cartId,
      productId: productId,
      amount: 1
    }

    this.cartService.postCartItem(postCartItemDTO);
    document.getElementById(`cart_actions_container_${productId}`).classList.add('active');
    ++this.cartSize;
  }

  goProduct(id: number) {
    this.router.navigate(['/produto/2']);
  }

  getGameCover(productId: number): string {
    switch (productId) {
      case 2:
        return 'game-images/halo-infinite.jpg';
      case 3:
        return 'game-images/deathloop.jpg';
      case 4:
        return 'game-images/back4blood.jpg';
      case 5:
        return 'game-images/psychonauts-2.jpg';
      case 6:
        return 'game-images/bf-2042.jpg';
      case 7:
        return 'game-images/re-village.jpg';
      case 8:
        return 'game-images/nioh-2.jpg';
      default:
        return 'game1.png';
    }
  }

  selected = 'relevant';

  products: Product[];
  cartProductIds: number[];

  public wallet: Wallet;

  cartId = null;
  cartSize = 0;
  cartPrice = 0;

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


  // implementar logica para preencher os icones de avaliação.

  rateArr = [1,2,3,4];

}
