import { Component, OnInit } from '@angular/core';
import { ProductRegistrationDTO } from '../../shared/models/dto/product/productRegistrationDTO';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    document.addEventListener("keydown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
    this.registrationFormGroup = this.formBuilder.group({
    name:[''],//OK
    image:[''],
    price:[''],
    amount:[''],
    description:[''],
    //releaseDate:['',Validators.required],//OK
    //genderId:['',Validators.required],
    //platformId:['',Validators.required],
    //publisherId:['',Validators.required],
    });
  }

  atualizarImagem(event: any): void {
    this.image = event.target.value;
  }

  onDate(event:any){
    console.log(event.target.value);
  }

  public registerProduct():void{
    console.log(this.registrationFormGroup.get('releaseDate').value)
    if(this.isFormValid()){
     const registrationForm: ProductRegistrationDTO = {
    //   name: this.registrationFormGroup.get('name').value,
    //   price: this.registrationFormGroup.get('price').value*100,
    //   description: this.registrationFormGroup.get('description').value,
    //   image: this.registrationFormGroup.get('image').value,
    //   ageRating: this.registrationFormGroup.get('ageRating').value,
     //  amount: this.registrationFormGroup.get('amount').value
     }
    // console.log(registrationForm);
  }
  }
  private isFormValid (): boolean {
    return this.registrationFormGroup.valid;
  }
}
