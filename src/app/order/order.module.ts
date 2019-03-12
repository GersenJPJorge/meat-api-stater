import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { Routes, RouterModule } from "@angular/router";


// lembrete: Quando trabalhamos com lazy-loading a rota tem que ser definida no proprio componente
const ROUTES: Routes = [
    {path: '', component: OrderComponent}
]

@NgModule({
    declarations: 
    [OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent],
    imports: 
    [SharedModule,  // lembrando que no shared modules já estão os imports que iríamos usar aqui
     RouterModule.forChild(ROUTES)], // se fosse na raiza seria forRoots

    exports: 
    []


})
export class OrderModule{}


