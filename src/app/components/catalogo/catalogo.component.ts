import { Component, OnInit } from '@angular/core';


interface Game {
  name: string;
  price: string;
  description: string;
  imgPath: string;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  // isso virá do banco de dados

  games: Game[] = [
    {name: 'Call of Duty',
    price: 'R$ 299,99',
    description: "Lorem ipsum dolor sit amet, c quis nostrud exercitation ullamco laboris nisi ut aliquip ex e.",
    imgPath: 'assets/images/game1.png'},
    {name: 'Call of Duty',
    price: 'R$ 299,99',
    description: "Lorem ipsum dolor sit amet, c quis nostrud exercitation ullamco laboris nisi ut aliquip ex e.",
    imgPath: 'assets/images/game1.png'},
    {name: 'Call of Duty',
    price: 'R$ 299,99',
    description: "Lorem ipsum dolor sit amet, c quis nostrud exercitation ullamco laboris nisi ut aliquip ex e.",
    imgPath: 'assets/images/game1.png'},
  ];
}
