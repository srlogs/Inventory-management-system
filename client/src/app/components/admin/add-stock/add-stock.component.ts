import { PlatformLocation } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit {
  productData: any = [];
  isSubmitted: boolean = false;
  stockData: any = [];
  isStockDataEmpty: boolean = false;
  constructor(
    private sharedService: SharedService,
    location: PlatformLocation,
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    location.onPopState(() => {
      this.sharedService.setProductData(this.productData);
      sessionStorage.removeItem('productData');
    });
  }

  form: FormGroup = this.formBuilder.group({
    initialStock: ['', [Validators.required]],
    currentStock: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  getProduct(): any {
    this.sharedService.getProductData.subscribe((data) => {
      this.productData = data;
      return data;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = {
      initialstock: this.f.initialStock.value,
      currentstock: this.f.currentStock.value,
      date: this.f.date.value,
      productid: this.productData.id,
    };
    if (this.isStockDataEmpty) {
      this.userService.addStockData(data).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/admin/sidenav/productDisplay']);
      });
    } else {
      console.log('the data which is need to be updated', data);
      this.userService.updateStockData(data).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/admin/sidenav/productDisplay']);
      });
    }
  }

  onBack() {
    this.router.navigate(['/admin/sidenav/productDisplay']);
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
      console.log(data);
      if (data.data === 'empty') {
        this.isStockDataEmpty = true;
        this.f.initialStock.setValue(0);
        this.f.currentStock.setValue(0);
      } else {
        this.isStockDataEmpty = false;
        this.f.initialStock.setValue(data.initialstock);
        this.f.currentStock.setValue(data.currentstock);
      }
      this.f.date.setValue(date.toDateString());
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

  get f() {
    return this.form.controls;
  }
}
