import { Component, ElementRef, NgModule, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather'
import { UserServiceService } from 'src/app/services/user-service.service';

import { IconsModule } from '../icons/icons.module'
@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css'],
})

@NgModule({
  imports : [IconsModule]
})

export class SideNavBarComponent implements OnInit {


  constructor(private elementRef : ElementRef, public userService : UserServiceService) { }

  onToggle() {
    let tag = this.elementRef.nativeElement.querySelector('nav');
    if(!tag.classList.contains('active')) {
     tag.classList.add('active')
    }
    else  {
      tag.classList.remove('active')
    } 
  }

  homeSubmenu() {
    console.log("submenu called")
    let tag = this.elementRef.nativeElement.querySelector('a');
    console.log("tag", tag)
    console.log(document.getElementById('homeSubmenu'));
  }

  ngOnInit(): void {
  }

}
