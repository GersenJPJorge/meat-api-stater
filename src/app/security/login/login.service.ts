import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginUser } from "./login.user.model"; // objeto que a gente vai receber do backend
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { MEAT_API } from "app/app.api";
import { Router, NavigationEnd } from "@angular/router";

@Injectable()
export class LoginService{

user: LoginUser //criando uma propriedade user para salvar o accessToken no operador 'do'

lastUrl: string
    
constructor(private http: HttpClient,
            private router: Router){
                // a propriedade events é um observable e quando voce se inscrever voce será notificado das mudanças de navegação
                this.router.events.filter(e => e instanceof NavigationEnd) // é o último dos eventos e o  que nos interessa 
 //               .subscribe( (e: NavigationEnd) => console.log(e.url))      // o filter vai reter só o primeiro, que é o que nos interessa
                                                                             // para saber em que página estava quando entrou. 
 .subscribe( (e: NavigationEnd) => this.lastUrl= e.url)
                                                                                                       
                                                                      

             }

// método para saber se o usuário está logado
isLoggedIn(): boolean {
    return this.user !== undefined
}

login(email: string, password: string): Observable<LoginUser> {
  return this.http.post<LoginUser>(`${MEAT_API}/login`,
        {email: email, password:  password})
       .do(user => this.user = user)
        }

logout(){             // pega o objeto user do '.do' e destroi
    this.user = undefined
}

handleLogin(path: string= this.lastUrl){    // opcional porque se ninguem passar vai para o '/'
    this.router.navigate(['/login', btoa(path)]) // btoa = encodar que é uma função nativa do javascript
}            




}