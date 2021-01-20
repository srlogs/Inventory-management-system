import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  submitted: boolean = false;
  numbericPattern = /^[0-9]*$/;
  namePattern = /^[a-zA-Z_ ]+$/;
  units: any = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserServiceService
  ) {}

  form: FormGroup = this.formBuilder.group({
    productname: ['', [Validators.required]],
    summary: ['', [Validators.required]],
    sellingprice: [
      '',
      [Validators.required, Validators.pattern(this.numbericPattern)],
    ],
    quantity: [
      '',
      [Validators.required, Validators.pattern(this.numbericPattern)],
    ],
    unit: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    stock: ['', Validators.pattern(this.numbericPattern)],
  });

  onCancel() {
    this.router.navigate(['/admin/sidenav/products']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = {
      title: this.f.productname.value,
      summary: this.f.summary.value,
      cost: this.f.sellingprice.value,
      quantity: this.f.quantity.value,
      unit: this.f.unit.value,
      stock: this.f.stock.value,
    };
    console.log(data);
    this.userService.addProduct(data).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/admin/sidenav/products']);
    });
  }

  ngOnInit(): void {
    this.userService.getUnits().subscribe((data) => {
      this.units = data;
    });
  }

  get f() {
    return this.form.controls;
  }
}
