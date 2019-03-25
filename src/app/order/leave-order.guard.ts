import { CanDeactivate, ActivatedRouteSnapshot, Router, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";

// o candeactivate é uma interface que espera o tipo generico que é o componentente que voce está associando áquele guard
export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

    canDeactivate(OrderComponent: OrderComponent, 
                  activateRoute: ActivatedRouteSnapshot, 
                  routerState: RouterStateSnapshot): boolean {
        if(!OrderComponent.isOrderCompleted()){
            return window.confirm('Deseja desistir da compra?')

        }else{
            return true
        }              
                  }

}