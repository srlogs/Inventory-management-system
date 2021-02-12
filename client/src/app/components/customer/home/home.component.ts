import { Component, ElementRef, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
@Pipe({ name: 'round' })
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productData: any = [];
  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private userService: UserServiceService
  ) {}

  transform(input: number) {
    return Math.floor(input);
  }

  productInfo(product: any) {
    console.log(product);
  }

  ngOnInit(): void {
    this.userService.getProducts().subscribe((data) => {
      this.productData = data;
    });
  }

  toToggle() {
    let tag = this.elementRef.nativeElement.querySelector('.navbar-collapse');
    if (!tag.classList.contains('show')) {
      tag.classList.add('show');
    } else {
      tag.classList.remove('show');
    }
  }
}
