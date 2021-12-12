import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

export interface Produto {
  id: number;
  name: string;
  price: number;
  compra: string;
  description: string;
  amount: number;
  buyDate: string;
  deliveryDate: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.total();
  }

  produto: Produto[] = [
    {
      id: 0,
      name: "Nioh - PS4",
      price: 11999,
      compra: "05/12/2021",
      description: "shaduhasd asdhsaudhasudhasu asudhasudhasuh asduashduhasu hasduash uashduhusahduahs saudhasudhasuhd auhdsauhdaudhasu hasduhasudhasudhasudhasu aushduashduashduashdauhudhasuh asudhasuhdasudhasudhasu hushdasuhduash ahdu huashduash uhasudhasudhasuhd uashduashduash uashduashdu hasuhduh uashduashudh uhasudhasuh usahduashduh uashduh",
      amount: 1,
      buyDate: "05/12/2021",
      deliveryDate: "15/12/2021"
    },
    {
      id: 1,
      name: "Nioh - PS4",
      price: 11999,
      compra: "05/12/2021",
      description: "shaduhasd asdhsaudhasudhasu asudhasudhasuh asduashduhasu hasduash uashduhusahduahs saudhasudhasuhd auhdsauhdaudhasu hasduhasudhasudhasudhasu aushduashduashduashdauhudhasuh asudhasuhdasudhasudhasu hushdasuhduash ahdu huashduash uhasudhasudhasuhd uashduashduash uashduashdu hasuhduh uashduashudh uhasudhasuh usahduashduh uashduh",
      amount: 1,
      buyDate: "05/12/2021",
      deliveryDate: "15/12/2021"
    },
    {
      id: 2,
      name: "Nioh - PS4",
      price: 11999,
      compra: "05/12/2021",
      description: "shaduhasd asdhsaudhasudhasu asudhasudhasuh asduashduhasu hasduash uashduhusahduahs saudhasudhasuhd auhdsauhdaudhasu hasduhasudhasudhasudhasu aushduashduashduashdauhudhasuh asudhasuhdasudhasudhasu hushdasuhduash ahdu huashduash uhasudhasudhasuhd uashduashduash uashduashdu hasuhduh uashduashudh uhasudhasuh usahduashduh uashduh",
      amount: 1,
      buyDate: "05/12/2021",
      deliveryDate: "15/12/2021"
    },
  ]

  totalPriceAux: number = 0;
  totalPrice: string;
  quantiaItem: number = 1;
  amountDif: number = 0;
  value: number = 0;
  amount: number = 0;

  total(): void {
    this.produto.forEach(produto => {
      this.totalPriceAux += produto.price;
      this.totalPrice = "R$ " + (this.totalPriceAux / 100).toFixed(2).replace(".", ",");
    });
  }

  updateInput(id: number, event: any): void {
    this.value = event.target.value;
    this.amountDif = this.value - this.produto[id].amount;
    if (this.amountDif > 0) {
      for (; this.amountDif > 0; this.amountDif--) {
        this.incrementa(id);
      }
    }
    else {
      this.amountDif *= -1;
      for (; this.amountDif > 0; this.amountDif--) {
        this.decrementa(id);
      }
    }
  }

  realPrice(id: number): string {
    return "R$ " + (this.produto[id].price * this.produto[id].amount / 100).toFixed(2).replace(".", ",");;
  }

  incrementa(id: number): void {
    this.produto[id].amount++;
    this.totalPriceAux += this.produto[id].price;
    this.totalPrice = "R$ " + (this.totalPriceAux / 100).toFixed(2).replace(".", ",");
  }

  decrementa(id: number): void {
    if (this.produto[id].amount > 1) {
      this.produto[id].amount--;
      this.totalPriceAux -= this.produto[id].price;
      this.totalPrice = "R$ " + (this.totalPriceAux / 100).toFixed(2).replace(".", ",");
    }
  }

}
