import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/models/product/product.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit, AfterViewInit {

  private searchName;
  private products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'amount', 'releaseDate', 'gender', 'publisher', 'platform', 'ratingSystem', 'remove']
  dataSource = new MatTableDataSource(this.products);

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private notificationService: NotificationService,
    private productService: ProductService,
   ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.getProducts();
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    document.addEventListener("keydown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }

 enterSearch(event: any) {
    this.searchName = event.target.value;
    this.productService.getProducts().subscribe((products) => {
      this.products = products.filter(this.haveName.bind(null, this.searchName));
      this.reloadTableT();
    });
  }


  private haveName(search, element): boolean {
    return element.name.toUpperCase().indexOf(search.toUpperCase()) !=  -1 || search == "";
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
      this.reloadTable(products);
    })
    return products;
  }

  reloadTable(products) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.sort = this.sort;
  }

  reloadTableT() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
  }

  formatDate(date: Date) {
    return date.toLocaleDateString('pt-BR');
  }
  remove(id: number) {
    this.productService.deleteProduct(id);
    this.notificationService.success("Produto removido com successo");
  }
}
