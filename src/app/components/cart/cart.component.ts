import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepperIntl } from '@angular/material/stepper';
import { CartItem } from '../../shared/models/cartItem.model';
import { Product } from '../../shared/models/product/product.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ProductService } from '../../shared/services/product.service';
import { PutCartItemDTO } from '../../shared/models/dto/cartItem/putCartItem.dto';
import { CartService } from '../../shared/services/cart.service';
import { Wallet } from '../../shared/models/wallet.model';
import { WalletService } from '../../shared/services/wallet.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';

export interface CartProduct {
  cartItemId: number;
  name: string;
  description: string;
  formatPrice: string;
  price: number;
  amount: number;
  totalPrice: number;
  formatTotalPrice: string;
}

@Injectable()
export class StepperIntl extends MatStepperIntl {
  override optionalLabel = '(OPCIONAL)';
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
              public authenticationService: AuthenticationService,
              private walletService: WalletService,
              private productService: ProductService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.cartId = this.authenticationService.getCartId();
    this.cartService.getCartItems(this.cartId).subscribe((cartItems) => {
      for (let i = 0; i< cartItems.length; i++) {
        this.productService.getProduct(cartItems[i].productId).subscribe((product) => {
          this.cartProducts.set(cartItems[i].id, {
            cartItemId: cartItems[i].id,
            index: i,
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            formatPrice: this.formatPrice(product.price/100),
            amount: cartItems[i].amount,
            formatTotalPrice: this.formatPrice(product.price/100 * cartItems[i].amount),
            totalPrice: product.price * cartItems[i].amount
          })
          // Quando esse método esta fora do loop, o array de produtos fica vazio (?)
          this.updateTotal();
        })

      }
    });

    this.walletService.getWallet(this.authenticationService.getUsername()).subscribe((wallet: Wallet) => {
      this.wallet = wallet;
      this.wallet.funds = this.wallet.funds / 100;
    });
  }

  updateCartItem(putCartItemDTO: PutCartItemDTO, cartItemId: number) {
    this.cartService.putCartItem(putCartItemDTO, cartItemId);
  }

  deleteCartItem(index: any) {
    let p = this.cartProducts.get(index);
    this.cartService.deleteCartItem(p.cartItemId);
    this.cartProducts.delete(index);
    this.updateTotal();
  }

  clearCart() {
    this.cartService.cleanCart(this.cartId);
    this.cartProducts.clear();
  }

  formatPrice(v: number) {
    return v.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  increaseAmount(index: any) {
    const p = this.cartProducts.get(index);
    p.amount++;
    p.totalPrice += p.price;
    p.formatTotalPrice = this.formatPrice(p.totalPrice/100);
    this.changeDOMElementHTML(`price_${index}`, p.formatTotalPrice);
    this.changeDOMElementHTML(`amount_input_${index}`, `value = '${p.amount}'`);
    this.updateCartItem({amount: p.amount}, p.cartItemId);
    this.updateTotal();
  }

  decreaseAmount(index: any) {
    const p = this.cartProducts.get(index);
    if (p.amount <= 1) return;
    p.amount--;
    p.totalPrice -= p.price;
    p.formatTotalPrice = this.formatPrice(p.totalPrice/100);
    this.changeDOMElementHTML(`price_${index}`, p.formatTotalPrice);
    this.changeDOMElementHTML(`amount_input_${index}`, `value = '${p.amount}'`)
    this.updateCartItem({amount: p.amount}, p.cartItemId);
    this.updateTotal();
  }

  updateTotal() {
    this.finalPrice = 0;
    for (const [key, value] of this.cartProducts) {
      this.finalPrice += value.totalPrice;
    }
    this.formatFinalPrice = this.formatPrice(this.finalPrice/100);
    this.changeDOMElementHTML('final_price', this.formatFinalPrice);
  }

  changeDOMElementHTML(id: string, newValue: any) {
    document.getElementById(id).innerHTML = newValue;
  }

  updateInput(index: any, event: any) {
    const p = this.cartProducts.get(index);
    if (!Number.isInteger(parseInt(event.target.value))) return;
    p.amount = event.target.value < 0 ? 0 : event.target.value;
    event.target.value = p.amount;
    p.totalPrice = p.amount * p.price;
    p.formatTotalPrice = this.formatPrice(p.totalPrice/100);
    this.changeDOMElementHTML(`price_${index}`, p.formatTotalPrice);
    this.updateCartItem({amount: p.amount}, p.cartItemId);
    this.updateTotal();
  }

  finishPurchase() {
    if (this.cartProducts.size ==  0) {
      this.notificationService.alert("O carrinho está vazio.");
      return;
    }
    this.router.navigate(["/checkout"])
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

  ptBRLocale =  Intl.NumberFormat('pt-br');
  cartId = null;
  cartProducts = new Map();
  finalPrice: number = 0;
  formatFinalPrice: string = this.ptBRLocale.format(0);
  public wallet: Wallet;

}
