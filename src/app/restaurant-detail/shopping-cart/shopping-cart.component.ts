import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
//  preserveWhitespaces: true,
  animations: [
    trigger('row', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('500ms 0s ease-in', keyframes([
        style({opacity:0, transform: 'translateX(-30px)', offset:0}), 
        style({opacity:0.8, transform: 'translateX(15px)', offset:0.8}), // 80% da animação
        style({opacity:1, transform: 'translateX(0px)', offset:1}), 
      ]))),
      transition('ready => void', animate('500ms 0s ease-out', keyframes([
        style({opacity:1, transform: 'translateX(0px)', offset:0}), 
        style({opacity:0.2, transform: 'translateX(-10px)', offset:0.2}), // 20% da animação
        style({opacity:0, transform: 'translateX(30px)', offset:1}), 
      ])))
    ])
  ]

})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready'

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
