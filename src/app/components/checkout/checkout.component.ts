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
import { NotificationService } from 'src/app/shared/services/notification.service';

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
    private router: Router,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.cartId = parseInt(this.authenticationService.getCartId());
    this.username = this.authenticationService.getUsername();
    this.userId = parseInt(this.authenticationService.getUserId());
    this.walletService.getWallet(this.username).subscribe(w => {
      this.wallet = {
        id: w.id,
        funds: w.funds,
        userId: w.userId
      }
    });
    // this.addressService.getAddressesByClient(this.userId).subscribe(a => {
    //   a.forEach((address) => {
    //     this.addresses.push({
    //       city: address.city,
    //       district: address.district,
    //       additionalInfo: address.additionalInfo,
    //       number: address.number,
    //       state: address.state,
    //       street: address.street,
    //       postalCode: address.postalCode
    //     })
    //   })
    //})
    this.cartService.getCartItems(this.cartId).subscribe((items) => {
      items.forEach(item => {
        this.productService.getProduct(item.productId).subscribe(p => {
          this.totalPrice += (item.amount * p.price);
          this.totalCart += (item.amount * p.price);
        })
      })
    });
  }

  formatPrice(v: number) {
    return (v/100).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  choicePaymentType(paymentId: number) {
    this.paymentType = paymentId;
  }

  cancel() {
    this.router.navigate(["/catalogo"])
  }

  choiceFreight(index: number) {
    this.freight = this.freights[index];
    this.totalPrice = this.totalCart + this.freight.price;
  }

  choiceAddress(addressId: any) {
    this.addressId = addressId;
  }

  validateFields(): boolean {
    if (this.addressId == null) {
      this.notificationService.error('Escolha um endereço para entrega.');
      return false;;
    }

    if (this.paymentType == null) {
      this.notificationService.error('Escolha uma forma de pagamento.');
      return false;
    }

    if (this.freight == null) {
      this.notificationService.error('Escolha uma entregadora para entrega.');
      return false;
    }

    return true;
  }

  finishPurshase() {
    if (!this.validateFields()) return;

    switch(this.paymentType) {
      case 4:
        if (this.wallet.funds < this.totalPrice) {
          this.notificationService.error('Crédito insuficiente.');
          return;
        }
        this.walletService.putWallet({
          walletId: this.wallet.id,
          value: this.wallet.funds - this.totalPrice
        })
        break;

        /***
         * TODO implementar outras formas de pagamento.
         */

    }

    this.cartService.cleanCart(this.cartId);
    // this.orderService.postOrder({
    //   cartId: this.cartId,
    //   addressId: this.addressId
    // });
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

  public addresses: Address[] = [
    {
      id: 1,
      city: 'Rio de Janeiro',
      district: '',
      additionalInfo: '',
      number: '342',
      state: 'Rio de Janeiro',
      street: 'Avenida Getúlio Vargas',
      postalCode: '21'
    },
    {
      id: 2,
      city: 'Rio de Janeiro',
      district: '',
      additionalInfo: '',
      number: '342',
      state: 'Rio de Janeiro',
      street: 'Avenida Getúlio Vargas',
      postalCode: '21'
    },
    {
      id: 3,
      city: 'Rio de Janeiro',
      district: '',
      additionalInfo: '',
      number: '342',
      state: 'Rio de Janeiro',
      street: 'Avenida Getúlio Vargas',
      postalCode: '21'
    },
  ];
  public wallet: Wallet;
  public totalPrice: number = 0;
  public totalCart: number = 0;
  public paymentType: number;
  public addressId: number;
  public freight;
  public cartId: number;
  public userId: number;
  public username: string;

}
