import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from "../app.api";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ErrorHandler } from "app/app.error-handler";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {

  constructor(private http: Http){}

        restaurants(): Observable<Restaurant[]> {
          return this.http.get(`${MEAT_API}/restaurants`)
          .map(response => response.json())
          .catch(ErrorHandler.handleError) // do meu app-error.ts

          // todos os metodos da api http retornam um observable
          // observable é um objeto daa biblioteca rxjs
          // e esse objeto nçao tem como retornar um tipo, porque sendo assincrono, ele nçao sabe qual será o tipo do retono
          // entao o retorno sera um observable, onde o tipo daquela resposta vai ser um array de restaurantes
          // Toda requisição retorna um observable response - Só que o response é muito genérico, porque traz
          // muita informação e nós só queremos o objeto json que a resposta vai nos trazer.
          // Para delimitar só o que nos interessa no response, usamos o operador map que vai transformar o response
          // em um array de restaurantes
        }
          // As chamadas http só serçao feitas apos o subscribe - que é feito no componente 

        
    // novo método que retona um restaurante á partir do id e nçao mais um array de restaurantes
        restaurantById(id: string): Observable<Restaurant>{
            return this.http.get(`${MEAT_API}/restaurants/${id}`) // tgemplate stream para concatenar o caminho da API
            .map(response => response.json()) // precisa do mapemaneto por causa do observable de response, que não é o que a gente quer
//           então vamos mapear para o objeto json
            .catch(ErrorHandler.handleError) // do meu app-error.ts

            // agora esse método deve ser chamado no componente de detalhe do restaurante
        }

    // novo método que retona os reviews de um restaurante á partir do id 
    reviewsOfRestaurant(id: string): Observable<any>{
      return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`) // tgemplate stream para concatenar o caminho da API
      .map(response => response.json()) // precisa do mapemaneto por causa do observable de response, que não é o que a gente quer
//           então vamos mapear para o objeto json
      .catch(ErrorHandler.handleError) // do meu app-error.ts

      // agora esse método deve ser chamado no componente de reviews do restaurante
  }

    // novo método que retona os itens de um menu 
    menuOfRestaurant(id: string): Observable<MenuItem>{
      return this.http.get(`${MEAT_API}/restaurants/${id}/menu`) 
      .map(response => response.json()) // precisa do mapemaneto por causa do observable de response, que não é o que a gente quer
//           então vamos mapear para o objeto json
      .catch(ErrorHandler.handleError) // do meu app-error.ts

      } 
      
    }