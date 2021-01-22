import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customerData: any;
  removeCustomerData: any = [];
  isChecked: boolean = false;
  toDelete: boolean = false;
  isPresent: boolean = false;
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  chooseCustomers(customer: any, e: any) {
    if (e.target.checked) {
      this.removeCustomerData.push(customer);
    } else {
      var index = this.removeCustomerData.findIndex((x: any) => {
        return (
          x.id === customer.id &&
          x.emailid === customer.emailid &&
          x.mobile === customer.mobile
        );
      });
      this.removeCustomerData.splice(index, 1);
    }

    if (this.removeCustomerData.length > 0) {
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

  removeCustomer() {
    console.log(this.removeCustomerData);
    for (let i = 0; i < this.removeCustomerData.length; ++i) {
      this.userService
        .removeCustomers(this.removeCustomerData[i].id)
        .subscribe((response) => {
          console.log(response);
          this.close();
        });
    }
    this.ngOnInit();
    this.removeCustomerData = [];
    this.toDelete = false;
  }

  addCustomer() {
    this.router.navigate(['/admin/sidenav/addCustomer']);
  }

  ngOnInit(): void {
    this.userService.getCustomers().subscribe((data) => {
      if (data.length > 0) {
        this.isPresent = true;
        this.customerData = data;
        console.log(this.customerData);
      } else {
        this.isPresent = false;
      }
    });
  }
}
