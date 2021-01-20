import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productData: any = [];
  isPresent: boolean = false;
  removeProductData: any = [];
  toDelete: boolean = false;
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  chooseProducts(product: any, e: any) {
    if (e.target.checked) {
      this.removeProductData.push(product);
    } else {
      var index = this.removeProductData.findIndex((x: any) => {
        return x.id === product.id;
      });
      this.removeProductData.splice(index, 1);
    }
    if (this.removeProductData.length > 0) {
      this.toDelete = true;
    } else {
      this.toDelete = false;
    }
  }

  removeProduct() {
    for (let i = 0; i < this.removeProductData.length; ++i) {
      this.userService
        .removeProduct(this.removeProductData[i].id)
        .subscribe((response) => {
          console.log(response);
        });
    }
    this.ngOnInit();
    this.removeProductData = [];
    this.toDelete = false;
  }

  addProduct() {
    this.router.navigate(['/admin/sidenav/newProduct']);
  }

  updateProduct() {
    this.router.navigate(['/admin/sidenav/updateProduct']);
  }

  ngOnInit(): void {
    this.userService.getProducts().subscribe((data) => {
      if (data.length > 0) {
        this.isPresent = true;
        this.productData = data;
      } else {
        this.isPresent = false;
      }
    });
  }
}
