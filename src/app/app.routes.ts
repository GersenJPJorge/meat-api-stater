import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderComponent } from "./order/order.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";

export const ROUTES: Routes = [
    {path: '', component: HomeComponent }, // componente padrão caso não se digite nada
    {path: 'restaurants', component: RestaurantsComponent },
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
            children: [
                {path: '',  redirectTo: 'menu', pathMatch: 'full'}, // componente padrão caso não se digite nada 
                {path: 'menu',  component: MenuComponent},          // após "restaurants/id"
                {path: 'reviews',  component: ReviewsComponent},
            ] },
    {path: 'order', component: OrderComponent },
    {path: 'order-summary', component: OrderSummaryComponent },
    {path: 'about', loadChildren: './about/about.module#AboutModule'}
    ]
// com a alteração do children devemos ir no componente principal de restaurant-detail e colocar o router-outlet para
// testar a navegação 
