import { CartItem } from "./shopping-cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationService } from "app/shared/messages/notitication.service";
 
@Injectable()
export class ShoppingCartService {                           //precisa do injectable porque vai chamar o NotificationService

    items:  CartItem[] = []              // uma coleção de itens do carrinho

    constructor(private notificationService: NotificationService){    // o NotificationService precisa ser instanciado aqui

    }


    clear(){                        // um método para limpar o carrinho 
         this.items = []            // recebe um array vazio    
    }

    addItem(item: MenuItem){        // um método para adicionar itens - voce adiciona um item do menu
 
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)

        // vou receber um item como parametro e vou testar de so id do menuitem é igual e ele
        if(foundItem){
            this.increaseQty(foundItem)
        }else{
            this.items.push(new CartItem(item))
        }   
        this.notificationService.notify(`Voce adicionou o item ${item.name}`)  // cartItem                                 
    }


    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity -1 
        if(item.quantity === 0 ){
            this.removeItem(item)
        }
    }

    removeItem(item: CartItem){     // um método para remover itens
        this.items.splice(this.items.indexOf(item), 1)  // removo um á partir daquele indice
        this.notificationService.notify(`Voce removeu o item ${item.menuItem.name}`)  // menuItem   
    }


    total(): number {                                   // um método de totalização onde o retorno é number
        return this.items
        .map(item => item.value())                      // substiuindo um item pelo valor daquele item
        .reduce( ( prev, value)=> prev+value, 0   )     // onde tenho o valor anterior e o atual
    }


    

} 