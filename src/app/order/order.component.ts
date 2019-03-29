import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import 'rxjs/add/operator/do';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

// emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

numberPattern = /^[0-9]*$/ 

  orderForm: FormGroup // propriedade(objeto) que vai representar nosso formulário

  delivery: number = 8 
  // numa aplicação real esse valor viria de um backend

  orderId: string


  paymentOptions: RadioOption[] = [
    
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de débito', value: 'DEB'},
    {label: 'Cartão refeição', value: 'REF'}
  
  ]

  constructor(private orderService: OrderService,
              private router: Router, // para rotear via programa precisa do router
              private formBuilder: FormBuilder) { } // precisa do formbuilder como injecao de dependencia

  ngOnInit() {
    // dentro desse objeto vao propriedades que representam os input do formulário
    this.orderForm = new FormGroup({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.email]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('',  [Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if(!email.value || !emailConfirmation.value){ // se nenhum dos dois existir no grupo
      return undefined
    }

    if(email.value !== emailConfirmation.value){ // se nenhum dos dois existir no grupo
      return {emailsNotmatch: true}
      }
      return undefined
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

    isOrderCompleted(): boolean {
      return this.orderId !== undefined
    }

    checkOrder(order: Order){
      // agora é preciso pegar essa compra e adicionar os itens do carrinho como orderitems
      // o .map transforma um item que é cartItem em orderitem, pegando só que é necessário  
      order.orderItems = this.cartItems()
                         .map((item:CartItem)=>new OrderItem(item.quantity, item.menuItem.id))
      // estamos pegando um array de cartitem e transformando num array de orderitem e pegando os items
      // e atribuindo esses items no objeto de compra

      this.orderService.checkOrder(order)
      .do((orderId: string) => {
          this.orderId = orderId
      })
      .subscribe( (orderId: string) => {
            this.router.navigate(['/order-summary']) // roteando programaticamente
 //          console.log(`Compra concluida: ${orderId}`)
           this.orderService.clear()   
      })      
//      console.log(order)

      //agora é preciso criar um método no  service que receba esse 0objeto(order) e mande para o servidor de backend             
    }

  }
