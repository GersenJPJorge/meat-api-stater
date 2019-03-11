
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AboutComponent} from './about.component'

// o que for declarado, ou especificado, aqui, precisa sair do módulo raiz (app.module.ts) e no módulo de rotas(app.routes.ts)


const ROUTES: Routes = [
  {path: '', component: AboutComponent}
]

@NgModule({
  declarations:[AboutComponent],  // São os componentes
  imports: [RouterModule.forChild(ROUTES)]
})


export class AboutModule {}  //para ser um módulo precisa importar o ngModule
