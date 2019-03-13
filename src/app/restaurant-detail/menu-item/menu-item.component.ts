import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'

import { MenuItem } from './menu-item.model';


@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready'

  @Input() menuItem: MenuItem // objeto do tipo MenuItem - precisa do @input porque as informações vem do componente parent (pai).
  // feito isso, vamos trabalhar no template menu-item.component.html

  @Output() add = new EventEmitter() // objeto de saida do tipo eventemitter
                              
                                   // obs: todos os "eventos" são marcados como propriedades "output"

                                   // o momento onde será emitido um evento será definido no template 

  constructor() { }

  ngOnInit() {
  }


  emitAddEvent(){
    this.add.emit(this.menuItem) // Isso quer dizer que alguem clicou no link adicionar, 
    //                              eu estou notificando, aqui está o objeto que foi clicado então faça alguma coisa   
  }

  // feito isso vamos para o component parent (restaurants.service) fazer a busca e iterar com esse novo componente
}
