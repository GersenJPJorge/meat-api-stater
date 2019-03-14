import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
            opacity: 0,
            "max-height": "0px"})),
      state('visible', style({
            opacity: 1,
            "max-height": "70px",
            "margin-top": "20px"})),
      transition('* => *',animate('250ms 0s ease-in-out'))    // wildcard porque não tem transições especificas de hidden para visible e vice-versa
      ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  restaurants: Restaurant[] 


  constructor(private restaurantsService: RestaurantsService) { }
  /*  usando o construtor para instanciar minha classe de serviços para ser usado no componente*/
  /*  precisa ser declarado na lista de providers do app.modules.ts*/ 

  ngOnInit( ) {

      this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
      // vou receber uma lista de restaurantes - 
      // aí eu vou pegar o que receber e passar para o valor  da minha propriedade
      // np momento que eu fizer um subscribe a requisição http vai ser feita.
      // a resposta vai chegar e será mapeada para o json da resposta , que será um array de restaurantes
      // vou receber o meu listener ( alista de restaurantes) e jogar na propriedade restautantes 
    }

    toggleSearch(){

      this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
      // recebendo o searchBarStae e se ele for 'hidden' eu troco para 'visible', caso contrário, para 'hidden'
    }
}
