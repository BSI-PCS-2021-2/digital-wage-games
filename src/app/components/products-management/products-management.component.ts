import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { ProductAll } from 'src/app/shared/models/product.model';


@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit {

  private products: ProductAll[] = [];

  displayedColumns: string[] = ['id', 'name', 'price', 'platform', 'releaseDate', 'remove'/*,'gender'*/];
  dataSource = new MatTableDataSource(this.products);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private productService: ProductService
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
      console.log(this.products);
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
    });
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
