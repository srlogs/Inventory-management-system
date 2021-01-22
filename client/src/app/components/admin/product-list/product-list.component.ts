import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Product } from '../product';

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
    private router: Router,
    private elementRef: ElementRef,
    private sharedService: SharedService
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
  close() {
    let tag = this.elementRef.nativeElement.querySelector('.modal');
    tag.classList.remove('show');
    setTimeout(() => {
      let mydiv = this.elementRef.nativeElement.querySelector('.modal');
      mydiv.style.width = '0';
    }, 75);
  }

  open() {
    let tag = this.elementRef.nativeElement.querySelector('.modal');
    tag.classList.add('show');
    let mydiv = this.elementRef.nativeElement.querySelector('.modal');
    mydiv.style.width = '100vw';
    mydiv.style.align = 'center';
  }

  removeProduct() {
    for (let i = 0; i < this.removeProductData.length; ++i) {
      this.userService
        .removeProduct(this.removeProductData[i].id)
        .subscribe((response) => {
          console.log(response);
          this.close();
        });
    }
    this.ngOnInit();
    this.removeProductData = [];
    this.toDelete = false;
  }

  addProduct() {
    this.router.navigate(['/admin/sidenav/newProduct']);
  }

  updateProduct(data: any) {
    this.sharedService.setProductData(data);
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
