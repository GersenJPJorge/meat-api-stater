
class Order{
    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [] // deixando vazio, por padrão
    ){}
    
}


// porque preciso mandar algumas informações para o backend(nem todas)
// nesse caso, a quantidade e a identificação do item
class OrderItem{            
    constructor(public quantity: number, public menuId: string){}                          
}

export{Order, OrderItem}