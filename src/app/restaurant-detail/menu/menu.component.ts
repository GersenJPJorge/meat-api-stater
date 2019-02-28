
import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../menu-item/menu-item.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {


//  menu: Observable<any> // vou deixar o subscribe por conta do async
menu: Observable<MenuItem>

  constructor( private restaurantsService: RestaurantsService, 
               private route: ActivatedRoute) { }

  
// pegando a referencia ao menu do restaurante
ngOnInit() {
  this.menu = this.restaurantsService
            .menuOfRestaurant(this.route.parent.snapshot.params['id'])}
// o id necessário foi obtindo através da rota, mas ela acontenceu no componente parent
}

//addMenuItem(item: MenuItem){
//  console.log(item)
//}
