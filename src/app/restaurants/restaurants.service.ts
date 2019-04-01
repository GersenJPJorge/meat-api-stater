import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from "../app.api";
import { Observable } from "rxjs";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient){}

        restaurants(search?: string): Observable<Restaurant[]> {
            let params: HttpParams = undefined

            
            if(search){
               params = new HttpParams().append('q', search) 
            }
          return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
        }
          // As chamadas http só serçao feitas apos o subscribe - que é feito no componente 
        
    // novo método que retona um restaurante á partir do id e nçao mais um array de restaurantes
        restaurantById(id: string): Observable<Restaurant>{
            return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
            // agora esse método deve ser chamado no componente de detalhe do restaurante
        }

    // novo método que retona os reviews de um restaurante á partir do id 
    reviewsOfRestaurant(id: string): Observable<any>{
      return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`) // tgemplate stream para concatenar o caminho da API
      // agora esse método deve ser chamado no componente de reviews do restaurante
  }

    // novo método que retona os itens de um menu 
    menuOfRestaurant(id: string): Observable<MenuItem[]>{
      return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`) 
      } 
      
    }