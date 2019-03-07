import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

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

  constructor(private orderService: OrderService,
              private router: Router) { } // para rotear via programa precisa do router

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

    checkOrder(order: Order){
      // agora é preciso pegar essa compra e adicionar os itens do carrinho como orderitems
      // o .map transforma um item que é cartItem em orderitem, pegando só que é necessário  
      order.orderItems = this.cartItems()
                         .map((item:CartItem)=>new OrderItem(item.quantity, item.menuItem.id))
      // estamos pegando um array de cartitem e transformando num array de orderitem e pegando os items
      // e atribuindo esses items no objeto de compra
      this.orderService.checkOrder(order)
          .subscribe( (orderId: string) => {
            this.router.navigate(['/order-summary']) // roteando programaticamente
 //          console.log(`Compra concluida: ${orderId}`)
           this.orderService.clear()   
      })      
      console.log(order)

      //agora é preciso criar um método no  service que receba esse 0objeto(order) e mande para o servidor de backend             
    }

  }
