import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/produto.service';

export interface Game {
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

  constructor(private productService: ProductService) { }

  priceReal: string;

  ngOnInit(): void {
    this.productService.getProduct().subscribe((games) => {
      this.game = games[0]
      this.convert(this.game.price);
    });
  }
  convert(price: number): void {
    this.priceReal = "R$ " + (price / 100).toFixed(2).replace(".", ",");
  }

  //isso virá do banco de dados

  game: Game =
    {
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

}
