import { Component, OnInit } from '@angular/core';
import {  PostCartItemDTO} from '../../shared/models/dto/cartItem/postCartItem.dto';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})

export class ProdutoComponent implements OnInit {

  constructor(private productService: ProductService,
              private cartService: CartService,
              private authenticationService: AuthenticationService,
              private router: ActivatedRoute) { }

  priceReal: string;

  ngOnInit(): void {
    this.cartId = parseInt(this.authenticationService.getCartId());
    this.router.paramMap.subscribe((param) => {
      this.product = {
        id: parseInt(param.get('produto')),
        name: null,
        description: null,
        price: null,
        rate: null,
        trailerPaths: []
      }
    });
    this.productService.getProduct(this.product.id).subscribe((product) => {
      this.product = {
        id: product.id,
        name: product.name,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: product.price,
        rate: product.rate,
        trailerPaths: ["../../../assets/videos/trailer.mp4", "../../../assets/videos/trailer2.mp4", "../../../assets/videos/trailer3.mp4", "../../../assets/videos/trailer4.mp4"]
      }
      this.selectedTrailer = product.trailerPaths[0];
    });
   this.defineCartSize();
   this.defineProductsOnCart();
  }
  
  formatPrice(v: number) {
    return (v/100).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  defineCartSize() {
    this.cartService.getCartItems(this.cartId).subscribe(e => {
      this.cartSize = e.length;
    })
  }

  defineProductsOnCart() {
    this.cartService.getCartItems(this.cartId).subscribe((cartItems)  => {
      cartItems.forEach(e => {
        if (e.productId == this.product.id) {
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

  selected(selection: string) {
    this.selectedTrailer = selection;
  }
 
  cartId = null;
  cartSize = 0;
  product: Product = null;
  selectedTrailer = null;
  rateArr = [1,2,3,4];

}
