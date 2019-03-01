import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from './radio.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
    ] 
    // tudo isso foi feito para que o uso do controlvalueacessor fique acessivel as diretivas do ngmodel e 
    // os modulos do reactiveform 
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption []                     // como essas opções vêm de fora precisa do decorator @Input

  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    this.value = value
    this.onChange(this.value) // dessa forma eu aviso as diretivas que o valor do meu componente mudou
  }

  writeValue(obj: any): void {                   // método usado quando as diretivas querem passar um valor para o componente
    this.value = obj;
//    throw new Error("Method not implemented."); 
  }
  registerOnChange(fn: any): void {                   // necessário sempre que o valor do componente tiver uma mudança,
    this.onChange = fn;                               // e essa mudança ocorre no nosso método "setvalue"  
 //   throw new Error("Method not implemented.");  
                                                  
  }
  registerOnTouched(fn: any): void {
 //   throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
 //   throw new Error("Method not implemented.");
  }

}
