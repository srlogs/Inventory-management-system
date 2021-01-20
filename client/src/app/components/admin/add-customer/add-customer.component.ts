import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  submitted: boolean = false;
  namePattern = /^[a-zA-Z ]{2,30}$/;
  emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  numbericPattern = /^[0-9]{10}$/;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {}

  form: FormGroup = this.formBuilder.group({
    customername: [
      '',
      [Validators.required, Validators.pattern(this.namePattern)],
    ],
    shopname: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    emailid: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    mobile: [
      '',
      [Validators.required, Validators.pattern(this.numbericPattern)],
    ],
    address: ['', Validators.required],
  });

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = {
      customername: this.f.customername.value,
      shopname: this.f.shopname.value,
      address: this.f.address.value,
      mobile: this.f.mobile.value,
      emailid: this.f.emailid.value,
    };
    this.userService.addCustomers(data).subscribe((response) => {
      console.log(response);
      window.location.reload();
    });
  }

  onCancel() {
    this.router.navigate(['/admin/sidenav/customers']);
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }
}
