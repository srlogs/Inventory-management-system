import { PlatformLocation } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  submitted: boolean = false;
  numbericPattern = /^[0-9]*$/;
  namePattern = /^[a-zA-Z_ ]+$/;
  constructor(
    private sharedService: SharedService,
    location: PlatformLocation,
    private router: Router,
    private userService: UserServiceService,
    private formBuilder: FormBuilder
  ) {
    location.onPopState(() => {
      sessionStorage.removeItem('productData');
    });
  }

  form: FormGroup = this.formBuilder.group({
    productname: ['', [Validators.required]],
    summary: ['', [Validators.required]],
    sellingprice: [
      '',
      [Validators.required, Validators.pattern(this.numbericPattern)],
    ],
    discount: ['', [Validators.pattern(this.numbericPattern)]],
    gst: ['', [Validators.required, Validators.pattern(this.numbericPattern)]],
  });

  productData: any = [];

  getProduct(): any {
    this.sharedService.getProductData.subscribe((data) => {
      this.productData = data;
      return data;
    });
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
    this.f.productname.setValue(this.productData.title);
    this.f.summary.setValue(this.productData.summary);
    this.f.sellingprice.setValue(this.productData.cost);
    this.f.discount.setValue(this.productData.discount);
    this.f.gst.setValue(this.productData.gst);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const data = {
      id: this.productData.id,
      title: this.f.productname.value,
      summary: this.f.summary.value,
      cost: this.f.sellingprice.value,
      discount: this.f.discount.value,
      gst: this.f.gst.value,
    };

    this.userService.updateProduct(data).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/admin/sidenav/products']);
    });
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
