import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/shopping-cart-item.model";


@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService){}



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
}



