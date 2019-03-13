import { EventEmitter } from "@angular/core";

export class  NotificationService{

    notifier = new EventEmitter<string>() // propriedade para o eventemitter com objeto do tipo string

    notify(message : string){

        this.notifier.emit(message)
    }    
// com isso esse serviço está disponível  para quem precisar e é só colocá-lo na lista de providers do módulo compartilhado (shared.modules)
}