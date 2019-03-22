import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notitication.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder,
              private loginService: loginService,
              private notificatioService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),  
      password: this.fb.control('', [Validators.required])

    })
  }
  login(){ // para receber o valor precisa do método subscribe
    this.loginService.login(this.loginForm.value.email, 
                            this.loginForm.value.password)
 //                          .subscribe(LoginUser => console.log("LoginUser", LoginUser)) 
                            .subscribe(user => 
                                        this.notificatioService.notify(`Bem vindo(a), ${user.name}`),
                                       response => // HttpErrorResponse - Já representa o erro da resposta 
                                        this.notificatioService.notify(response.error.message))
} 
}
