import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.css']
})
export class DeliveryPartnerComponent implements OnInit {
  userData : any;
  removeUserData : any = [];
  isChecked : boolean = false;
  toDelete : boolean = false;
  constructor(private userService : UserServiceService) { }

  chooseUsers(e : any, user : any) {
    if(e.target.checked) {
      this.removeUserData.push(user);
    }
    else {
      var index = this.removeUserData.findIndex((x : any) => {
        return (x.id === user.id && x.emailid === user.emailid);
      });
      this.removeUserData.splice(index, 1);
    }
    if(this.removeUserData.length > 0) {
      this.toDelete = true;
    }
    else {
      this.toDelete = false;
    }
  }

  removeUser() {
    console.log(this.removeUserData);
    for(let i = 0; i < this.removeUserData.length; ++i) {
      this.userService.removeDeliveryPartner(this.removeUserData[i].id).subscribe(response => {
        console.log(response);
      })
    }

    this.userService.getDeliveryPartners().subscribe(data => {
      this.userData = data;
    });

    console.log(this.userData);

    this.removeUserData = [];
    
  }

  ngOnInit(): void {
    this.userService.getDeliveryPartners().subscribe(data => {
      this.userData = data;
    });
  }

}
