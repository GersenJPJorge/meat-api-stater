"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs"); // capaz de ler os arquivos (file system) das 'keys'
var https = require("https"); // capaz de ler os arquivos (file system) das 'keys'
var auth_1 = require("./auth");
//import {handleAuthorization} from './authz'
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
//middleware para login
//server.post('/login', (req, resp)=>{      //post porque vai mandar informaçoes (e-mail - senha - etc) tendo dois objetos (req e response)
//    resp.json({message: 'Ok'})            // pode ser retornado algo no objeto json - aqui é só para efeito de teste 
//})
server.post('/login', auth_1.handleAuthentication);
//server.use('/orders', handleAuthorization)
// Use default router
server.use(router);
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
