import { Component, OnInit } from '@angular/core';
import {  PostCartItemDTO} from '../../shared/models/dto/cartItem/postCartItem.dto';
import { ProductService } from '../../shared/services/produto.service';
import { CartService } from '../../shared/services/cart.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

export interface Game {
  id: number;
  name: string;
  price: number;
  description: string;
  video: string[];
}



@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})

export class ProdutoComponent implements OnInit {

  constructor(private productService: ProductService,
              private cartService: CartService,
              private authenticationService: AuthenticationService) { }

  priceReal: string;

  ngOnInit(): void {
    this.cartId = parseInt(this.authenticationService.getCartId());
    this.productService.getProduct().subscribe((games) => {
      this.game = games[0]
      this.convert(this.game.price);
   });
   this.defineCartSize();
   this.defineProductsOnCart();
  }
  
  convert(price: number): void {
    this.priceReal = "R$ " + (price / 100).toFixed(2).replace(".", ",");
  }

  defineCartSize() {
    this.cartService.getCartItems(this.cartId).subscribe(e => {
      this.cartSize = e.length;
    })
  }

  defineProductsOnCart() {
    this.cartService.getCartItems(this.cartId).subscribe((cartItems)  => {
      cartItems.forEach(e => {
        if (e.productId == this.game.id) {
          document.getElementsByClassName(`container-price`)[0].classList.add('active');
        }
      })
    });
  }

  postCartItem(productId: number) {
    const postCartItemDTO: PostCartItemDTO = {
      cartId: this.cartId,
      productId: productId,
      amount: 1
    }
    
    this.cartService.postCartItem(postCartItemDTO);
    document.getElementsByClassName(`container-price`)[0].classList.add('active');
    ++this.cartSize;
  }

  //isso virá do banco de dados

  game: Game =
    {
      id: 2,
      name: 'Halo Infinite',
      price: 0,
      description: "dhasuhdisah asudhiasdhasdhasiuhduashd asuhdasiuhdasihduashdaiushd asuhdiuashdiuashdiuash ashdasiuhdi uahsdiuhas iuahsduhasi hasiudhaiu haisudh",
      video: [
        "assets/videos/trailer.mp4",
        "assets/videos/trailer2.mp4",
        "assets/videos/trailer3.mp4",
        "assets/videos/trailer4.mp4"
      ]
    }

  dir: string = this.game.video[0];

  selected(selection: string) {
    this.dir = selection;
  }
  cartId = null;
  cartSize = 0;

}
