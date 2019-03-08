import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
})
export class RatingComponent implements OnInit {


/*  O @Output é para emissão de eventos, 
então o componente parent se inscreve para ser notificado quando aquele evento acontecer dentro do componente filho, 
mas não necessariamente para atribuir valores nas suas propriedades, 
até porque passamos um método para ser chamado e esse método pode ser fazer n tarefas.
*/


@Output() rated = new EventEmitter<number>()

  rates: number[] =[1,2,3,4,5]

  rate: number = 0
  previousRate: number 

  constructor() { }

  ngOnInit() {
  }

  setRate(r: number){
    this.rate = r
    this.previousRate = undefined
    this.rated.emit(this.rate)
  }


  setTemporaryRate(r: number){
    if (this.previousRate === undefined){
      this.previousRate = this.rate
    }
    this.rate = r
  }

  clearTemporaryRate(){
    if (this.previousRate !== undefined){
      this.rate = this.previousRate
      this.previousRate = undefined
    }
  }


  /*@Output() é o inverso de @Input()?
  Marconi Marcos · Aula 70 · há um ano
  Olá Tarso, boa tarde!
    Entendi que o @Input()  é usado para atribuir valores a variáveis no componente Child(filha) enviados através do componente Parent(Pai).
    Já o @Output()  seria o inverso disto, ou seja, você atribui variáveis no componente Parent(pai) com valores enviados do componente Child(Filha).
    A minha dedução está correta? Porque se faz necessário o uso do  EventEmitter ?
    Obs: Excelente curso e didática, meus parabéns!
  
    
  
  Tarso Bessa
  Tarso — Instrutor · há um anoResposta
  Olá Marconi,
    O @Input é isso mesmo.
  
    O @Output é para emissão de eventos, então o componente parent se inscreve para ser notificado quando aquele evento acontecer dentro do componente filho, mas não necessariamente para atribuir valores nas suas propriedades, até porque passamos um método para ser chamado e esse método pode ser fazer n tarefas. O importante é a notificação do evento em si.
    Fazendo uma analogia com um componente HTML existente, como o input, você tem o evento onChange que é chamado quando o valor do campo muda. Um componente Angular é capaz de fazer a mesma dinâmica só que com eventos personalizados.
    O EventEmitter é um objeto capaz de emitir eventos. Na prática, é um Observable que os interessados podem se inscrever. 
    Olhando a definição da classe:
    class EventEmitter<T> extends Subject {
    // outras coisas ...
    emit(value?: T)
    subscribe(generatorOrNext?: any, error?: any, complete?: any): any
  }
  Temos dois métodos importantes. O emit usado para disparar o evento com o valor e o subscribe usado para inscrever um interessado (que geralmente é o componente parent).
    O emit é feito de forma explícita no código. O subscribe é feito de forma implícita através da declaração no template.
    Emit:
    @Output() add = new EventEmitter()
   
  emitAddEvent(){
      this.add.emit(this.menuItem)
  }
  Subscribe:
  
  <mt-menu-item (add)="shoppingCart.addItem($event)">
  </mt-menu-item>
  Se fôssemos traduzir o subscribe acima em código, seria similar a isso:
  
  menuItemComponent.add.subscribe(menuItem => {
      shoppingCartComponent.addItem(menuItem)
  })
  Abraços.
*/

}
