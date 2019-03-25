import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./security/login/login.component";
import { LoggedInGuard } from "./security/loggedin.guard";

export const ROUTES: Routes = [
    {path: '', component: HomeComponent }, // componente padrão caso não se digite nada
    {path: 'login/:to', component: LoginComponent }, // criado um parametro 'to' - faça login e depois vá para essa url
    {path: 'login', component: LoginComponent },
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
            children: [
                {path: '',  redirectTo: 'menu', pathMatch: 'full'}, // componente padrão caso não se digite nada 
                {path: 'menu',  component: MenuComponent},          // após "restaurants/id"
                {path: 'reviews',  component: ReviewsComponent},
            ] },
    {path: 'restaurants', component: RestaurantsComponent },    // as rotas genéricas devem ficar por ultimo.
    {path: 'order', loadChildren: './order/order.module#OrderModule',
            canLoad: [LoggedInGuard] }, // so faz sentido canload nas rotas tardias
    {path: 'order-summary', component: OrderSummaryComponent },
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    {path: '**', component: NotFoundComponent}                             // wildcard - quando não há nenhuma rota
                                                                           // tem que ficar no final por causa o router do angular
//    {path: 'about', loadChildren: '@Meat/about/about.module#AboutModule'}
    ]
// com a alteração do children devemos ir no componente principal de restaurant-detail e colocar o router-outlet para
// testar a navegação 
