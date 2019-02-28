
import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw'

export class ErrorHandler{

    static handleError( error: Response | any){ // metodo onde vou receber um objeto(da api do angular) do tipo response ou qualquer um.
        let errorMessage: string                                         // dentro do método será testado 
        if (error instanceof Response){
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
        }else{
            errorMessage = error.toString()
        }
        console.log(errorMessage)
        return Observable.throw(errorMessage)
        
    }
// uma vez esse m]etodo pronto agora temos que ir na classe de serviços (restaurants.service)
// e importar essa classe e associar esse metodo estático ao try catch
}