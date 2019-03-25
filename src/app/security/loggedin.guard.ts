import { CanLoad, Route } from "@angular/router";
import { LoginService } from "./login/login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanLoad {


// precisamos injetar o login service para verificar se ele se logou e est[a ok
constructor(private loginService: LoginService){

}


 canLoad(route: Route): boolean {                          //metodo canload
       const loggedin = this.loginService.isLoggedIn()
       if(!loggedin){
              this.loginService.handleLogin(`/${route.path}`)     // metodo handlelogin que desvisa para a pagina de login caso ele não esteja logado
                                                  // esse método vai ser usado em vários lugares e evita ficar dando router=navigate passando endereços
                                                  // obs: muito bom essa técnica - criar ele em loginservice
       }
//       console.log(route)
//        return false
              return loggedin
 }   
}