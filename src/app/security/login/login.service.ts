import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginUser } from "./login.user.model";
import 'rxjs/add/operator/do';
import { MEAT_API } from "app/app.api";

@Injectable()
export class loginService{

    user: LoginUser //criando uma propriedade user para salvar o accessToken no operador 'do'
    
    constructor(private http: HttpClient){}

    // método para saber se o usuário está logado
    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<LoginUser> {
                return this.http.post<LoginUser>(`${MEAT_API}/login`,
                {email: email, password:  password})
                .do(user => this.user = user)
            }

}