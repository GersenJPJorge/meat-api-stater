import { MenuItem } from "../menu-item/menu-item.model";

export class CartItem {

    constructor(public menuItem: MenuItem,         // public porque vai ser acessado por shopping-cart.services
                public quantity: number = 1){
    }

    value(): number {       // método para totalizar 
         return this.menuItem.price * this.quantity  
    }
}