import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart-item.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  delivery: number = 8 
  // numa aplicação real esse valor viria de um backend


  paymentOptions: RadioOption[] = [
    
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de débito', value: 'DEB'},
    {label: 'Cartão refeição', value: 'REF'}
  
  ]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }


// o valor do item já está implementado no carrinho de compras
// será criado também o mesmo método em order.service mudando a assinatura
itemsValue(): number {
  return this.orderService.itemsValue()
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

