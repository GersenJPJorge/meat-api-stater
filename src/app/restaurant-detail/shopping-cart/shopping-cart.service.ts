import { CartItem } from "./shopping-cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {

    items:  CartItem[] = []              // uma coleção de itens do carrinho

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
    }


    total(): number {                                   // um método de totalização onde o retorno é number
        return this.items
        .map(item => item.value())                      // substiuindo um item pelo valor daquele item
        .reduce( ( prev, value)=> prev+value, 0   )     // onde tenho o valor anterior e o atual
    }


    

} 