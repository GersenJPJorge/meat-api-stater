import { Request, Response} from 'express'   // ajuda na tipagem e associa com req: e resp: que ajudam no auto-complete
import { User, users } from './users'
import * as jwt from 'jsonwebtoken'
import { apiConfig } from './api-config';

export const handleAuthentication = (req: Request, resp: Response)=>{    // importar o handleAuthentication no server.ts
    const user: User = req.body  // o objeto que vem do body é um suer

    if(isValid(user)){
        const dbUser = users[user.email]
        const token =  jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret)
        resp.json({name: dbUser.name, email: dbUser.email, accessToken: token})
    }else{
        resp.status(403).json({message: 'Dados inválidos.'}) 
    }
}
    function isValid(user: User): boolean{
        if(!User){  // se o body não existir
            return false
        }
        const dbUser = users[user.email]    // obtendo do objeto users o user.email
        return dbUser !== undefined && dbUser.matches(user)  // criar o método matches dentro da classe no user.ts
}