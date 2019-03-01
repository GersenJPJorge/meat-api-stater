import { Component, OnInit, Input } from '@angular/core';
import { RadioOption } from './radio.model';
import { setValueOnPath } from '@angular/platform-browser/src/browser/browser_adapter';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent implements OnInit {

  @Input() options: RadioOption []                     // como essas opções vêm de fora precisa do decorator @Input

  value: any

  setValue(value: any){
    this.value = value
  }

  constructor() { }

  ngOnInit() {
  }

}
