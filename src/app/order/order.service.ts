import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/shopping-cart-item.model";
import { Observable } from "rxjs/Observable";
import { Order, OrderItem} from "./order.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { MEAT_API } from "app/app.api";
import { loginService } from "app/security/login/login.service";


@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService, 
                private http: HttpClient,
                private loginService: loginService){}

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
        let headers = new HttpHeaders()
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)

        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
                                .map(order=> order.id)

                                // método post tem algumas opções:
        //1a - a url 
        //2a- o objeto que será mandado, no caso, order (uma representação textual do objeto)
        //3a - os headers (o conteúdo - o content-type) - será preciso importar o headers e requestoptions
        // http só trabalha com texto e o json é uma representação textual e o método stringify é a representação textual do objeto order
        // para ser mandado para o corpo da requisição http  

        // tudo acima que foi feito nada mais é que uma configuração de um observable,
        // para fazer um post de uma determinda url, passar um objeto e com aquelas opções de header e quando
        // a resposta chegar(response) vamos mapea-la para a representação json dela. 
        // para isso seria preciso fazer a requisição para se inscrever nesse observable através do subscribe.
        
        
        // tudo acima feito, vamos fazer as implementações necessarias no componente (colocar  o subscribe)
    }

    clear(){
        this.cartService.clear()
    }

}






