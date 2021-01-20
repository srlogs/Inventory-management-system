import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitted : boolean = false;
  notMatch : boolean = false;
  numericPattern = /^[0-9]{10}$/;
  emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  namePattern = /^[a-zA-Z]+$/;
  isShipper : boolean = false;
  constructor(private formBuilder : FormBuilder, private router : Router, private userService : UserServiceService) { }

  form : FormGroup = this.formBuilder.group({
    name : ['', [Validators.required, Validators.pattern(this.namePattern)]],
    emailid : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password : ['', [Validators.minLength(5), Validators.required]],
    cpassword : ['', [Validators.minLength(5), Validators.required]],
    mobile : ['', [Validators.required, Validators.pattern(this.numericPattern)]]
  })

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    else if(this.f.password.value != this.f.cpassword.value) {
      this.notMatch = true;
      return;
    }
    const data = {
      name : this.f.name.value,
      emailid : this.f.emailid.value,
      password : this.f.password.value,
      mobile : this.f.mobile.value,
      role : this.isShipper == true ? "shipper" : "customer"
    }

    this.userService.registerUser(data).subscribe(res => {
      console.log(res);
    })

    this.router.navigate(['/']);
  }

  onClicking(e : any) {
    this.isShipper = e.target.checked;
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

}
