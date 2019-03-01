import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de débito', value: 'DEB'},
    {label: 'Cartão refeição', value: 'REF'}
  
  ]

  constructor() { }

  ngOnInit() {
  }

}
