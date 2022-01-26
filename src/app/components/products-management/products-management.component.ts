import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { Product } from 'src/app/shared/models/product/product.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductService } from 'src/app/shared/services/product.service';



@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit, AfterViewInit {

  products: Product[] = [];
  filterProducts: Product[];
  displayedColumns: string[] = ['id', 'name', 'price', 'amount', 'releaseDate', 'gender', 'publisher', 'platform', 'ratingSystem', 'remove']
  dataSource = new MatTableDataSource([]);

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private notificationService: NotificationService,
    private productService: ProductService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.products = this.getProducts();
    this.filterProducts = this.products;
    this.dataSource = new MatTableDataSource(this.products);
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

  search(event: any) {
    const pattern: string = event.target.value;
    this.filterProducts = this.products.filter(p => {
      return p.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1;
    })
    this.dataSource = new MatTableDataSource(this.filterProducts);
  }

  getProducts() {
    const products: Product[] = [];
    this.productService.getProducts().subscribe(p => {
      p.forEach(item => {
        const product: Product = {
          id: item.id,
          name: item.name,
          description: item.description,
          amount: item.amount,
          price: item.price,
          releaseDate: item.releaseDate,
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
        products.push(product);
      })
      this.dataSource = new MatTableDataSource(this.filterProducts);
      this.dataSource.sort = this.sort;
    })
    return products;
  }
  formatDate(date: Date) {
    return date.toLocaleDateString('pt-BR');
  }
  remove(id: number) {
    this.removeFromArray(id);
    this.productService.deleteProduct(id);
    this.dataSource = new MatTableDataSource(this.filterProducts);
    this.notificationService.success("Produto removido com successo");
  }

  removeFromArray(id: number) {
    this.products = this.products.filter(p => {
      return p.id !== id;
    })
    this.filterProducts = this.filterProducts.filter(p => {
      return p.id !== id;
    })
  }
}
