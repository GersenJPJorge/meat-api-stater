import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notitication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  navigateTo: string

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificatioService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),  
      password: this.fb.control('', [Validators.required])

    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/') // encodar também
    // se nada for digitado vai para a raiz da aplicação

  }
  login(){ // para receber o valor precisa do método subscribe
    this.loginService.login(this.loginForm.value.email, 
                            this.loginForm.value.password)
 //                          .subscribe(LoginUser => console.log("LoginUser", LoginUser)) 
                            .subscribe(user => // os 3 callbacks são: 1o para a resposta - 2o em caso de erro - quando o observable terminar
                                        this.notificatioService.notify(`Bem vindo(a), ${user.name}`),
                                       response => // HttpErrorResponse - Já representa o erro da resposta 
                                        this.notificatioService.notify(response.error.message),
                                        ()=>{
                                          this.router.navigate([  atob(this.navigateTo)]) // desencoda 

                                        } )
} 
}
