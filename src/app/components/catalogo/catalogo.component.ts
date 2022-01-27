import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { MatStepperIntl } from '@angular/material/stepper';
import { Product } from '../../shared/models/product/product.model';
import { PostCartItemDTO } from '../../../app/shared/models/dto/cartItem/postCartItem.dto';
import { ProductService } from '../../shared/services/product.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NotificationService } from '../../shared/services/notification.service';
import { WalletService } from '../../shared/services/wallet.service';
import { Wallet } from '../../shared/models/wallet.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
  public sliderControl;
  public search: FormGroup;
  constructor(private productService: ProductService,
    public authenticationService: AuthenticationService,
    private walletService: WalletService,
    private cartService: CartService,
    private router: Router,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sliderControl = new FormControl([0, 1000]);
    this.search = this.formBuilder.group({
      searchBar: [''],
      plataforma: [''],
      genero: [''],
      publisher: [''],
    })
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

    this.cartService.getCartItems(this.cartId).subscribe((cartItems) => {
      cartItems.forEach(e => {
        document.getElementById(`cart_actions_container_${e.productId}`).classList.add('active');
        this.cartSize++;
      })
    });

  }

  getProducts() {
    const products: Product[] = [];
    this.productService.getProducts().subscribe(p => {
      p.forEach(item => {
        const product: Product = {
          id: item.id,
          name: item.name,
          description: item.description,
          amount: item.amount,
          price: item.price,
          releaseDate: item.releaseDate,
          gender: {
            id: item.gender.id,
            name: item.gender.name
          },
          platform: {
            id: item.platform.id,
            name: item.platform.name
          },
          publisher: {
            id: item.publisher.id,
            name: item.publisher.name
          },
          ratingSystem: {
            id: item.ratingSystem.id,
            name: item.ratingSystem.name
          }
        }
        products.push(product);
      })
    })
    this.products = products;

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
    this.notificationService.success('Produto foi adicionado ao carrinho.')
    ++this.cartSize;
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
        return 'game-images/nioh-2.jpg';
    }
  }

  selected = 'relevant';


  enterSearch() {
    const name = this.search.get('searchBar').value;
    const platform = this.search.get('plataforma').value;
    const gender = this.search.get('genero').value;
    const publisher = this.search.get('publisher').value;
    this.productService.getProducts().subscribe((products) => {
      this.products = products.filter(this.haveName.bind(null, name, platform, gender, publisher));
    });
  }

  private haveName(name, platform, gender, publisher, element): boolean {
    const hasName = (element.name.toUpperCase().indexOf(name.toUpperCase()) != -1 || name == "");
    const hasGender = (element.gender.id == gender || gender == "");
    const hasPlatform = (element.platform.id == platform || platform == "");
    const hasPublisher = (element.publisher.id == publisher || publisher == "");
    const isInLimitPrice = (this.sliderControl[0] > element.price && element.price > this.sliderControl[1]);;

    return hasName && hasGender && hasPlatform && hasPublisher && isInLimitPrice;
  }

  products: Product[];
  cartProductIds: number[];

  public searchName = "";

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
}
