import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from './../../shared/services/product.service';
import { Product } from './../../shared/models/product/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public products;
  categoryCounts = [];
  constructor(private productService: ProductService) { }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.getProducts();
    })
  }

  ngOnInit(): void {
  }
  getProducts() {

    this.productService.getProducts().subscribe(p => {
      this.products = [];
      p.forEach(item => {
        const product: Product = {
          id: item.id,
          name: item.name,
          description: item.description,
          amount: item.amount,
          price: item.price,
          releaseDate: item.releaseDate,
          imgUrl: item.imgUrl,
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
        this.products.push(product);
      })
      this.products.sort((a,b)=>{
        let dateOne = new Date(a.releaseDate); 
        let dateTwo = new Date(b.releaseDate);
        return dateOne.getTime() - dateTwo.getTime();
      })
      this.categoryCounts = this.countCategory(this.products);
      console.log(this.products);
    })
  }
  countCategory(products): string[] {
    let productsCategories = [];
    products.forEach(product => {
      if (productsCategories.indexOf(product.gender.name) == -1) {
        productsCategories.push(product.gender.name);
      }
    });

    return productsCategories;
  }

  productByCategory(category){
    let productsBycategory = [];
    this.products.forEach(product =>{
      if(product.gender.name == category){
        productsBycategory.push(product)
      }
    })
    return productsBycategory;
  }
}