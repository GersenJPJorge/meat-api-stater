import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit {

  constructor( private shoppingCartService: ShoppingCartService) { } // injetado aqui

  ngOnInit() {
  }

    items(): any[] {                        // método que vai expor os itens
      return this.shoppingCartService.items;

    }

    clear(){
      this.shoppingCartService.clear()
    }

    removeItem(item: any){
      this.shoppingCartService.removeItem(item)
    }


    addItem(item: any){
      this.shoppingCartService.addItem(item)
      // esse método pode, e será usado, pelo componente pai(menu.html), quando for adicionar itens, não nocarrinho,
      // mas do lado
    }

    total(): number {                       // método que vai expor o total dos valores
      return this.shoppingCartService.total()

    }

}
