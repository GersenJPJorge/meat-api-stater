
import {HttpErrorResponse} from '@angular/common/http'
import 'rxjs/add/observable/throw'
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { NotificationService } from './shared/messages/notitication.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{            //ErrorHandler é a classe padrão do angular e é um privider
                                                                      // logo, precisa ser injetado
                                                                      // se ele será o erro padrão deverá ser refernciado na lista de 
                                                                      // providers do módulo principal (app.modules)

  constructor(private ns: NotificationService,
              private injector: Injector){
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any){
    
      if(errorResponse instanceof HttpErrorResponse){
        const message = errorResponse.error.message
        switch(errorResponse.status){
          case 401:
            this.injector.get(LoginService).handleLogin
          break;
          case 403:
               this.ns.notify(message || 'Não autorizado') 
          break
          case 404:
              this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes') 
          break
        }
      }
     super.handleError(errorResponse)                              // usando o metodo original da classe extendida ErrorHandler
    }
}