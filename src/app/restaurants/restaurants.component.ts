import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import {trigger, state, style, transition, animate} from '@angular/animations'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'; // para usar reactiveForms precisa desses imports
import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/do'; // so para ver os resultados da querie no console
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch'; // para tratar funcções http
import 'rxjs/add/observable/from'; // para criar uma string á partir de um array
import { Observable } from 'rxjs/Observable';



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

  searchForm: FormGroup                           // precisa de duas propriedades(objetos) para representar o formulário
  searchControl: FormControl                      // precisa de duas propriedades(objetos) para representar o formulário


  constructor(private restaurantsService: RestaurantsService,
              private fb: FormBuilder) { }   // precisa ser injetado uma instancia de formBuilder para trabalhar com reactiveForms
  /*  usando o construtor para instanciar minha classe de serviços para ser usado no componente*/
  /*  precisa ser declarado na lista de providers do app.modules.ts*/ 

  ngOnInit( ) {

        this.searchControl = this.fb.control('')                        // vai começar com o texto vazio
        this.searchForm = this.fb.group({                         // precisa ser instanciado por conta do reactiveForm
             searchControl: this.searchControl                    
        })

        this.searchControl.valueChanges
          .debounceTime(500) // 500 milisegundos tempo entre identificar as novas doigitações
          .distinctUntilChanged()
//          .do(searchTerm=> console.log(`q=${searchTerm}`)) // só logar para ver o que está acontecendo
          .switchMap(searchTerm => // esse switchterm vem do primeiro observable
              this.restaurantsService
                  .restaurants(searchTerm) // esse switcheterm é o que cliente digitou na busca
                  .catch(error=>Observable.from([]))) // nesse caso a querie deu erro mas não vai retornar nada para o nosso subscribe
              .subscribe(restaurants => this.restaurants = restaurants)          // esse subscribe é da segunda resposta

              // importantissimo - com o switchamap uma querie não subscreve outra - No caso da web, uma querie demora e a outra não,
              // a mais rapida não vai subscrever a mais demorada



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
