import { Component, OnInit, Injectable } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperIntl } from '@angular/material/stepper';
import { Product } from '../../../app/shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';


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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products
      this.convert(this.products);
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

  selected = 'relevant';

  products: Product[];



  // implementar logica para preencher os icones de avaliação.

  rateArr = [1,2,3,4];

}
