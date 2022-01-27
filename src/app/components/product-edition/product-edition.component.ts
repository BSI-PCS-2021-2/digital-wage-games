import { Component, OnInit } from '@angular/core';
import { PutProductDTO } from '../../shared/models/dto/product/putProduct.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product/product.model';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.scss']
})

export class ProductEditionComponent implements OnInit {
  private id;
  private formDate;
  public green = 'green';
  public white = 'white';
  public registrationFormGroup: FormGroup;
  image: string = "../../../assets/images/ImageField.png"
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id = parseInt(param.get('produto'))
    });
    this.getProduct();
    document.addEventListener("keydown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
    this.registrationFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      releaseDate: ['', Validators.required],
      ageRating: ['', Validators.required],
      platform: ['', Validators.required],
      gender: ['', Validators.required],
      publisher: ['', Validators.required]
    });
  }

  getProduct():void {
    let product:Product;
    this.productService.getProduct(this.id).subscribe(p => {
      product = {
        id: p.id,
        name: p.name,
        description: p.description,
        amount: p.amount,
        price: p.price,
        releaseDate: p.releaseDate,
        gender: {
          id: p.gender.id,
          name: p.gender.name
        },
        platform: {
          id: p.platform.id,
          name: p.platform.name
        },
        publisher: {
          id: p.publisher.id,
          name: p.publisher.name
        },
        ratingSystem: {
          id: p.ratingSystem.id,
          name: p.ratingSystem.name
        }
      }
      this.registrationFormGroup = this.formBuilder.group({
        name: [product.name, Validators.required],
        price: [product.price/100, Validators.required],
        amount: [product.amount, Validators.required],
        description: [product.description, Validators.required],
        image: ['', Validators.required],
        releaseDate: [product.releaseDate, Validators.required],
        ageRating: [product.ratingSystem, Validators.required],
        platform: [product.platform, Validators.required],
        gender: [product.gender, Validators.required],
        publisher: [product.publisher, Validators.required]
      });
    })
  }

  atualizarImagem(event: any): void {
    this.image = event.target.value;
  }

  public registerProduct(): void {
    const dto: PutProductDTO = {
      id: this.id,
      name: this.registrationFormGroup.controls['name'].value,
      price: this.registrationFormGroup.controls['price'].value * 100,
      amount: this.registrationFormGroup.controls['amount'].value,
      description: this.registrationFormGroup.controls['description'].value,
      releaseDate: moment(this.formDate).format('YYYY-MM-DD'),
      ratingSystemId: this.registrationFormGroup.controls['ageRating'].value,
      platformId: this.registrationFormGroup.controls['platform'].value,
      genderId: this.registrationFormGroup.controls['gender'].value,
      publisherId: this.registrationFormGroup.controls['publisher'].value,
    }
    console.log(dto)
    this.productService.putProduct(dto);
    this.notificationService.success("Produto editado com sucesso");
    if (this.isFormValid()) {

    }
  }
  private isFormValid(): boolean {
    return this.registrationFormGroup.valid;
  }

  onDate(event) {
    this.formDate = event.target.value;
  }
}
