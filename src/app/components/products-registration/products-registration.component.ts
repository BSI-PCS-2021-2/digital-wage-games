import { Component, OnInit } from '@angular/core';
import { ProductRegistrationDTO } from '../../shared/models/dto/product/productRegistrationDTO';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
      releaseDate: new FormControl(),
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
    if(this.isFormValid()){
      const dto = {
        name: this.registrationFormGroup.controls['name'].value,
        price: this.registrationFormGroup.controls['price'].value * 100,
        amount: this.registrationFormGroup.controls['amount'].value,
        description: this.registrationFormGroup.controls['name'].value,
        releaseDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        ratingSystemId: this.registrationFormGroup.controls['ageRating'].value,
        platformId: this.registrationFormGroup.controls['platform'].value,
        genderId: this.registrationFormGroup.controls['gender'].value,
        publisherId: this.registrationFormGroup.controls['publisher'].value,
      }
      this.productService.postProduct(dto);
      this.notificationService.success('Produto adicionado com sucesso!')
    } else {
      this.notificationService.error('Preencha todos os campos obrigatórios.')
    }
  }
  private isFormValid (): boolean {
    return this.registrationFormGroup.valid;
  }

  clearFields() {
        this.registrationFormGroup.controls['name'].reset();
        this.registrationFormGroup.controls['price'].value
        this.registrationFormGroup.controls['amount'].value
        this.registrationFormGroup.controls['name'].value
        this.registrationFormGroup.controls['ageRating'].value
        this.registrationFormGroup.controls['platform'].value
        this.registrationFormGroup.controls['gender'].value
        this.registrationFormGroup.controls['publisher'].value
  }
}
