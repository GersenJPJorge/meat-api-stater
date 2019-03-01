import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from "@angular/forms";

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input()label: string
  @Input()errorMessage: string

  input: any  // esse objeto será a referencia no template, no lugar do iptAddress

  @ContentChild(NgModel) model: NgModel 
  // o parametro do contentchild pode ser uma referencia a um elemento ou uma diretiva, no nosso caso, uma diretiva
  // feito isso temos que atribuir a direetiva model â minhas propriedades "input"


  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    // será acionado quando o conteúdo do ng-content for definido, for apresentado 

    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.input = this.model
    if( this.input === undefined){
        throw new Error('Esse componente precisa ser usado com uma diretiva ngModel')

      } 
    
    }

  hasSuccess(): boolean{
      return this.input.valid && (this.input.dirty || this.input.touched)
    }
  
  hasError(): boolean {

     return this.input.invalid && (this.input.dirty || this.input.touched) // a diretiva ngModel tem a propriedade "invalid"

    }
    
  }
