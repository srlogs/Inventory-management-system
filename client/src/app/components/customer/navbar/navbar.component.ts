import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}
  toToggle() {
    let tag = this.elementRef.nativeElement.querySelector('.navbar-collapse');
    if (!tag.classList.contains('show')) {
      tag.classList.add('show');
    } else {
      tag.classList.remove('show');
    }
  }
}
