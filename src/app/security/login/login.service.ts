import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginUser } from "./login.user.model"; // objeto que a gente vai receber do backend
import 'rxjs/add/operator/do';
import { MEAT_API } from "app/app.api";
import { Router } from "@angular/router";

@Injectable()
export class LoginService{

    user: LoginUser //criando uma propriedade user para salvar o accessToken no operador 'do'
    
    constructor(private http: HttpClient,
                private router: Router){}

    // método para saber se o usuário está logado
    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<LoginUser> {
                return this.http.post<LoginUser>(`${MEAT_API}/login`,
                {email: email, password:  password})
                .do(user => this.user = user)
            }

handleLogin(path?: string){    // opcional porque se ninguem passar vai para o '/'
    this.router.navigate(['/login', btoa(path)]) // btoa = encodar que é uma função nativa do javascript
}            

}