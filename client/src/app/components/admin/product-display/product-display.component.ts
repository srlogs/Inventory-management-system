import { PlatformLocation } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css'],
})
export class ProductDisplayComponent implements OnInit {
  productData: any = [];
  stockData;
  constructor(
    private sharedService: SharedService,
    location: PlatformLocation,
    private userService: UserServiceService,
    private router: Router
  ) {
    location.onPopState(() => {
      this.sharedService.setProductData(this.productData);
      sessionStorage.removeItem('productData');
    });
  }

  removeProduct() {
    this.userService
      .removeProduct(this.productData.id)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/admin/sidenav/products']);
      });
  }

  getProduct(): any {
    this.sharedService.getProductData.subscribe((data) => {
      this.productData = data;
      return data;
    });
  }

  updateProduct() {
    this.sharedService.setProductData(this.productData);
    this.router.navigate(['/admin/sidenav/updateProduct']);
  }

  adjustStock() {
    this.sharedService.setProductData(this.productData);
    this.router.navigate(['/admin/sidenav/adjustStock']);
  }

  onCancel() {
    this.router.navigate(['/admin/sidenav/products']);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('productData')) {
      this.productData = JSON.parse(sessionStorage.getItem('productData'));
    } else {
      this.getProduct();
    }
    var date = new Date();
    const data = {
      productid: this.productData.id,
      date: date.toDateString(),
    };
    this.userService.getOneProductStock(data).subscribe((data) => {
      if (data.data === 'empty') {
        this.stockData = 0;
      } else {
        this.stockData = data.initialstock;
      }
    });
    console.log(this.productData);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (sessionStorage.getItem('productData'))
      sessionStorage.setItem(
        'productData',
        sessionStorage.getItem('productData')
      );
    else
      sessionStorage.setItem('productData', JSON.stringify(this.productData));
  }
}
