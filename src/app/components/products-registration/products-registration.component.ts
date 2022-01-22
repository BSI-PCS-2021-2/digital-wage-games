import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-registration',
  templateUrl: './products-registration.component.html',
  styleUrls: ['./products-registration.component.scss']
})
export class ProductsRegistrationComponent implements OnInit {

  image:string = "../../../assets/images/ImageField.png"
  constructor() { }

  ngOnInit(): void {
    document.addEventListener("keydown",function(e){
      if(e.key==='Enter'){
        e.preventDefault();
      }
    });
  }

  atualizarImagem(event:any):void{
    this.image = event.target.value;
  }

}
