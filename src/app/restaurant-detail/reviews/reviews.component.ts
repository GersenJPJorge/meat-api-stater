import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent implements OnInit {

reviews: Observable<any> // como não será feito subscribe aqui,
// será pego uma referencia para o retorno do método do serviço

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantsService
    .reviewsOfRestaurant(this.route.parent.snapshot.params['id']) 
    // precisa dos parametros da rota que esta ativa, e nesse caso será a rota pai, daí  o "route.parent". 
    
// não será feito subscribe aqui - o pipe async se encarregará disso ( presente no reviews.component.html)    
  }
}
