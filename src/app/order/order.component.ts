import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart-item.model';

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

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }


// expondo os itens
cartItems(): CartItem[]{                 // isso é um método
  return this.orderService.cartItems()
    }

    increaseQty(item: CartItem){
      this.orderService.increaseQty(item)
    }    
    decreaseQty(item: CartItem){
      this.orderService.decreaseQty(item)
    }    

    remove(item: CartItem){
      this.orderService.remove(item)
    }    

}

