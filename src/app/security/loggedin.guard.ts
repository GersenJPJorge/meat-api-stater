import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from "@angular/router";
import { LoginService } from "./login/login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {


// precisamos injetar o login service para verificar se ele se logou e est[a ok
constructor(private loginService: LoginService){}

checkAuthentication(path: string): boolean {

       const loggedin = this.loginService.isLoggedIn()
       if(!loggedin){
              this.loginService.handleLogin(`/${path}`)     // metodo handlelogin que desvisa para a pagina de login caso ele não esteja logado
                                                  // esse método vai ser usado em vários lugares e evita ficar dando router=navigate passando endereços
                                                  // obs: muito bom essa técnica - criar ele em loginservice
       }
//       console.log(route)
//        return false
              return loggedin


}

canLoad(route: Route): boolean {     
       console.log('canload')                     
       return this.checkAuthentication(route.path)}

canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
       console.log('canActivate')                     

       return this.checkAuthentication(activatedRoute.routeConfig.path) // o routeconfig é o objeto Router do método canLoad]
}

}