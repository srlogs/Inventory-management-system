import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted : boolean = false;
  isValid : boolean = true;
  numeric = /^((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|^(admin)$/;

  constructor(private formBuilder : FormBuilder, private userService : UserServiceService, private router : Router) { }

    form : FormGroup = this.formBuilder.group({
    emailid : ['', [Validators.required, Validators.pattern(this.numeric)]],
    password : ['', [Validators.required, Validators.minLength(5)]]
  })

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    const data = {
      emailid : this.f.emailid.value,
      password : this.f.password.value
    }

    this.userService.authenticateUser(data).subscribe(res => {

      if(res.status == 200) {
        this.router.navigate(['/admin/sidenav']);
        console.log(res);
        console.log(res.accessToken);
        localStorage.setItem("accessToken", res.accessToken);
      }
      else if(res.status == 400) {
        this.isValid = false;
        return;
      }
    })

    
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  } 

}
