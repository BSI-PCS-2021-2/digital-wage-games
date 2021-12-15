import { Component, OnInit, Injectable } from '@angular/core';
import { MatStepperIntl } from '@angular/material/stepper';
import { Product } from '../../../app/shared/models/product.model';
import { PostCartItemDTO } from '../../../app/shared/models/dto/cartItem/postCartItem.dto';
import { ProductService } from '../../shared/services/product.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CartService } from '../../shared/services/cart.service';
import { Options } from '@angular-slider/ngx-slider';


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

  constructor(private productService: ProductService,
              private authenticationService: AuthenticationService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.cartId = this.authenticationService.getCartId();
    this.getProducts();
    this.defineProductsOnCart();
    
    if (this.cartId !== null) {
      this.activeLoggedButtons();
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
      this.products = products
      this.convert(this.products);   
    });
  }

  activeLoggedButtons() {
    document.getElementsByClassName("cart-button")[0].classList.add('active');
  }

  convert(products: Product[]): void {
    products.forEach(product => {
      let price = Number(product.price)/100;
      product.price = "R$ "+ price.toString().replace('.', ',');
    });
    this.products = products
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

  selected = 'relevant';

  products: Product[];
  cartProductIds: number[];

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
