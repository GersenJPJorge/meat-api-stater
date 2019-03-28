import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class authInterceptor implements HttpInterceptor {

//    constructor(private loginService: LoginService){}
    constructor(private injector: Injector){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService)
/*
        let headers = new HttpHeaders()
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
*/

if(loginService.isLoggedIn()){
    const authRequest = request.clone
    ({setHeaders:{'Authorization':`Bearer ${loginService.user.accessToken}`}})

    return next.handle(authRequest)
}else{
    return next.handle(request)
}
    }
}
