import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/shopping-cart-item.model";
import { Observable } from "rxjs/Observable";
import { Order, OrderItem} from "./order.model";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { MEAT_API } from "app/app.api";


@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService, 
                private http: HttpClient){}

itemsValue(): number {
    return this.cartService.total()
}

// expondo os itens do carrinho
cartItems(): CartItem[]{
return this.cartService.items
}

// sendo criado aqui e implementado em shopping-cart.service.ts
increaseQty(item: CartItem){
    this.cartService.increaseQty(item)
    }
// sendo criado aqui e implementado em shopping-cart.service.ts
decreaseQty(item: CartItem){
    this.cartService.decreaseQty(item)
    }
// sendo criado aqui e implementado em shopping-cart.service.ts
remove(item: CartItem){
    this.cartService.removeItem(item)
    }

 // aqui vamos usar chamadas http (precisa colocar também no construtor) e essas chamadas usam observables   
    checkOrder(order: Order): Observable<string>{
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
                                .map(order=> order.id)
          }

    clear(){
        this.cartService.clear()
    }

}






