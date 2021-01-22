import { Component, ElementRef, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.css'],
})
export class DeliveryPartnerComponent implements OnInit {
  userData: any;
  removeUserData: any = [];
  isChecked: boolean = false;
  toDelete: boolean = false;
  isPresent: boolean = false;
  constructor(
    private userService: UserServiceService,
    private elementRef: ElementRef
  ) {}

  chooseUsers(e: any, user: any) {
    if (e.target.checked) {
      this.removeUserData.push(user);
    } else {
      var index = this.removeUserData.findIndex((x: any) => {
        return x.id === user.id && x.emailid === user.emailid;
      });
      this.removeUserData.splice(index, 1);
    }
    if (this.removeUserData.length > 0) {
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

  removeUser() {
    console.log(this.removeUserData);
    for (let i = 0; i < this.removeUserData.length; ++i) {
      this.userService
        .removeDeliveryPartner(this.removeUserData[i].id)
        .subscribe((response) => {
          console.log(response);
          this.close();
        });
    }

    this.ngOnInit();
    this.removeUserData = [];
    this.toDelete = false;
  }

  ngOnInit(): void {
    this.userService.getDeliveryPartners().subscribe((data) => {
      if (data.length > 0) {
        this.isPresent = true;
        this.userData = data;
      } else {
        this.isPresent = false;
      }
    });
  }
}
