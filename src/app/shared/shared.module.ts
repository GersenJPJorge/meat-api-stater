import { NgModule, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common"; // no modulo raiz ele já faz parte do browsermodule
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { OrderService } from "app/order/order.service";

@NgModule({
    declarations: 
        // os componentes usam diretivas de formularios, logo precisam importam varios componentes relacionados,tais como formsmodule
        [InputComponent,
        RadioComponent,
        RatingComponent],
    imports: 
        [FormsModule,
        ReactiveFormsModule,
        CommonModule],
    exports:
        [InputComponent,
        RadioComponent,
        RatingComponent,
        FormsModule,ReactiveFormsModule,CommonModule] // reimportando esses módulos, que chamar esse componente não vai precisar declará-los.   
})
export class SharedModule {
        static forRoot(): ModuleWithProviders {
            return {
                ngModule: SharedModule,
                providers: 
                [ShoppingCartService,
                 RestaurantsService,
                 OrderService] 
                    }
// obs: Isso torna nosso core-module obsoleto
         // vamos tirá-lo do app.module e acrescentar o forRoot no sharedModule
        } 

}

// com isso podemos tirar esses componentes do modulo raiz (app.module.ts) e importar esse módulo dentro da lista de imports do módulo raiz