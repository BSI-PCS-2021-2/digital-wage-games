import { Component, OnInit } from '@angular/core';
import { ProductRegistrationDTO } from '../../shared/models/dto/product/productRegistrationDTO';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-products-registration',
  templateUrl: './products-registration.component.html',
  styleUrls: ['./products-registration.component.scss']
})

export class ProductsRegistrationComponent implements OnInit {

  public green = 'green';  
  public white = 'white';  
  public registrationFormGroup: FormGroup;

  image: string = "../../../assets/images/ImageField.png"
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    document.addEventListener("keydown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
    this.registrationFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['',Validators.required],
      amount: ['',Validators.required],
      description: ['',Validators.required],
      image: ['',Validators.required],
      releaseDate:['',Validators.required],
      ageRating:['',Validators.required],
      platform:['',Validators.required],
      gender:['',Validators.required],
      publisher:['',Validators.required]
    });
  }

  atualizarImagem(event: any): void {
    this.image = event.target.value;
  }

  public registerProduct(): void {
    const dto = {
      name: this.registrationFormGroup.controls['name'].value,
      price: this.registrationFormGroup.controls['price'].value,
      amount: this.registrationFormGroup.controls['amount'].value,
      description: this.registrationFormGroup.controls['name'].value,
      releaseDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      ratingSystemId: this.registrationFormGroup.controls['ageRating'].value,
      platformId: this.registrationFormGroup.controls['platform'].value,
      genderId: this.registrationFormGroup.controls['gender'].value,
      publisherId: this.registrationFormGroup.controls['publisher'].value,
    }
    console.log(dto)
    this.productService.postProduct(dto);
    if(this.isFormValid()){
     
    }
  }
  private isFormValid (): boolean {
    return this.registrationFormGroup.valid;
  }

  onDate(event){
    return;
  }
}
