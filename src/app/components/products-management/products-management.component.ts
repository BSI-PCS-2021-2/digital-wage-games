import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  name: string;
  position: number;
  price: number;
  amount: number;
  ageRating: string;
  releaseDate: string;
}

const products: Product[] = [
  { position: 1, name: 'Jogo teste', price: 15000, amount: 250, ageRating: '10+', releaseDate: '10/02/2020' },
  { position: 2, name: 'Jogo teste1', price: 25000, amount: 270, ageRating: '16+', releaseDate: '16/05/2021' },
  { position: 3, name: 'Jogo teste2', price: 13000, amount: 200, ageRating: '16+', releaseDate: '05/01/2017' },
  { position: 4, name: 'Jogo teste3', price: 17000, amount: 550, ageRating: 'L', releaseDate: '25/04/2015' },
  { position: 5, name: 'Jogo teste4', price: 1000, amount: 300, ageRating: '18+', releaseDate: '23/10/2021' },
  { position: 6, name: 'Jogo teste5', price: 35000, amount: 200, ageRating: '18+', releaseDate: '18/04/2016' },
];

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'price', 'amount', 'ageRating', 'releaseDate'];
  dataSource = new MatTableDataSource(products);

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  ngOnInit(): void {
  }

}
