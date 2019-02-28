import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

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

}
