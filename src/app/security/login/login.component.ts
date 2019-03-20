import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginService } from './login.service';
import { LoginUser } from "./login.user.model"


@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder,
              private loginService: loginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),  
      password: this.fb.control('', [Validators.required])

    })
  }
  login(){ // para receber o valor precisa do método subscribe
    this.loginService.login(this.loginForm.value.email, 
                            this.loginForm.value.password)
                           .subscribe(LoginUser => console.log(LoginUser)) 
  } 
}
