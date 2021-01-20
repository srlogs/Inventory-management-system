import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productData: any = [];
  isPresent: boolean = false;
  constructor(private userService: UserServiceService) {}

  addProduct() {}

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
