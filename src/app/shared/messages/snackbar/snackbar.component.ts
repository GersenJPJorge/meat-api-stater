import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { NotificationService } from '../notitication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })), 
      state('visible', style({
        opacity: 1,
        bottom: '30px'
        
      })), 
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ]),
  ]

})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!'

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService ) { }   // precisa ser declarado aqui para poder usar o subscribe

  ngOnInit() {                                                          // o ponto ideal para se inscreve é no ngOniti porque
                                                                        // todas as dependencias já foram carregadas
      this.notificationService.notifier
            .do(message => {
                this.message = message
                this.snackVisibility = 'visible'
            }).switchMap(message => Observable.timer(3000))
              .subscribe(timer => this.snackVisibility = 'hidden' )                                                                          
     }                                                                                          
                                                                                                 
/* só para testar a animação
  toggleSnack(){
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden'
    // se for igual a hidden recebe visible, caso contrário recebe hidden
}
*/


}
