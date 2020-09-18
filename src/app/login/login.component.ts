import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder, 
    private router: Router
    ) { 

    }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    username:[''],
    password:['']
  })

  submit(){
    if (
      this.loginForm.controls['username'].value === "user" &&
      this.loginForm.controls['password'].value === "password"
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      alert("Username or Password WRONG!")
    }
  }
}
