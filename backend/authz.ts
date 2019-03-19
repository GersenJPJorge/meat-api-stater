
import { Request, Response } from "express";
import * as jwt  from 'jsonwebtoken';
import { apiConfig } from "./api-config";

export const handleAuthorization = (req: Request, resp: Response, next)=> { // o next não precisa tipar porque é só uma callBack
    const token = extractToken(req) // criada uma constante para representar o token
                                    // criada uma função para extrair aquele token do resquest
    if(!token){
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"') // o objeto resposta tem o método setHeader
                                                                      // onde a gente informa o header que queremos
                                                                      // no caso do 401 tem que ser exatamente assim
        resp.status(401).json({message: 'Voce precisa se autenticar'}) //  status 401 passando também um objeto json, 
                                                                       // que vai ter um objeto message
    }else{
        jwt.verify(token, apiConfig.secret, (error, decoded)=>{    // a função callback vai informar se deu erro ou não
                                                                      // vai ter dois parametros (erro e decoded)  
            if(decoded){
                next()                                                // aviso ao express que está tudo ok, deixa o request passar
            }else{
                resp.status(403).json({message: 'Não autorizado.'})                                           // a resposta agora é mais direta, vai ser um 403, indicando
                                                                      // que ele está proibido de acessa aquele recurso e também
                                                                      // retornar um objeto json message  
            }
        } )
    }

}

function extractToken(req: Request): string {   // vai receber um request e vai retornar uma string, que é o token de acesso

    let token = undefined
        if(req.headers && req.headers.authorization){    // o token deve vir nos headers do request
            //Authoriation: Bearer XXX.XXX.XXX           // O token deverá vir assim: Authorization - Bearer - e o token com as 
                                                         // tres partes (header - corpo - assinatura)
                                                         // se fizer split com bearer mais as tres partes, teremos o valor do token     
            const parts: string[] = req.headers.authorization.split(' ')
            if (parts.length === 2 && parts[0] === 'Bearer'){
                token = parts[1]

            }   
        }                                                  
    return token
    }
