import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/shared/models/wallet.model';
import { Address } from 'src/app/shared/models/address.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { OrderService } from '../../shared/services/order.service';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { AddressService } from '../../shared/services/address.service';
import { WalletService } from '../../shared/services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private cartService: CartService,
    private productService: ProductService,
    private addressService: AddressService,
    private walletService: WalletService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cartId = parseInt(this.authenticationService.getCartId());
    this.username = this.authenticationService.getUsername();
    this.userId = parseInt(this.authenticationService.getUserId());
    this.freight = this.freights[0];
    this.walletService.getWallet(this.username).subscribe(w => {
      this.wallet.funds = w.funds;
      this.wallet.id = w.id
    });
    this.addressService.getAddressesByClient(this.userId).subscribe(a => {
      this.addresses = a;
    })
    this.cartService.getCartItems(this.cartId).subscribe((items) => {
      items.forEach(item => {
        this.productService.getProduct(item.productId).subscribe(p => {
          this.totalPrice += (item.amount * p.price);
          this.totalCart += (item.amount * p.price);
        })
      })
    });
    this.addressId = this.addresses[0].id;
    this.totalPrice += this.freight.price;
  }

  formatPrice(v: number) {
    return (v/100).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  choicePaymentType(paymentType: any) {
    this.paymentType = paymentType;
  }

  cancel() {
    this.router.navigate(["/catalogo"])
  }

  choiceFreight(freightChoice: number) {
    this.freight = this.freights[freightChoice];
    this.totalPrice = this.totalCart + this.freight.price;
  }

  choiceAddress(addressId: any) {
    this.addressId = addressId;
  }

  finishPurshase() {
    this.walletService.putWallet({
      walletId: this.wallet.id,
      value: this.wallet.funds - this.totalPrice
    })
    this.cartService.cleanCart(this.cartId);
    this.orderService.postOrder({
      cartId: this.cartId,
      addressId: this.addressId
    });
    this.router.navigate(["/minha-conta/success"]);
  }

  freights = [
    {
      id: 1,
      name: 'Transportadora 1',
      price: 10000
    },
    {
      id: 2,
      name: 'Transportadora 1',
      price: 12400
    },
    {
      id: 3,
      name: 'Transportadora 1',
      price: 9400
    }
  ]

  addresses: Address[];

  public wallet: Wallet = {
    id: null,
    funds: null,
    userId: null
  }
  public totalPrice: number = 0;
  public totalCart: number = 0;
  public paymentType;
  public addressId: number;
  public freight;
  public cartId: number;
  public userId: number;
  public username: string;

}
