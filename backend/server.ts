import * as jsonServer from 'json-server'

import {Express} from 'Express' // para poder tipar e fazer auto-complete dos métodos disponíveis e tratamento de erro melhor

import * as fs from 'fs'        // capaz de ler os arquivos (file system) das 'keys'


import * as https from 'https'        // capaz de ler os arquivos (file system) das 'keys'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Use default router
server.use(router)

const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () =>  {
    console.log('JSON Server is running on https://localhost:3001')
})

