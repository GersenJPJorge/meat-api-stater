import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  // criar uma propriedade(objeto) do tipo Restaurant

  restaurant: Restaurant


  constructor(private restaurantsService: RestaurantsService,                 // instancia-lo no construtor (injetá-lo)
              private route: ActivatedRoute   ) { } 

  ngOnInit() {

          this.restaurantsService.restaurantById(this.route.snapshot.params['id'])
          .subscribe(restaurant => this.restaurant = restaurant)
         //  o id poder ser obtido através de subscribe ou snapshot
         // como o acesso é uma única vez o mais indicado é snapshot                                              
         // params é o objeto que contem os valores dos parametros - o nome do parametro colocado na rota é 'id' 
          
          // receber o restaurant e atribuir na minha propriedade local(objeto)
  
       // para passar o id é preciso ter acesso a rota que está ativada e para saber qual rota está activada
       // existe um objeto em angula chamada actived route que nos trás todas as informações necessárias, 
       // como por exempo  qual a url ativada e quais parametros foram passados para aquela url
       // colocar esse objeto activedroute no construtor                                               

      }

}
