import app from './app'
import http from 'http'
import {Server} from 'socket.io'
import SocketManager from './socket'

const PORT = process.env.PORT || 5000
const httpServer = http.createServer(app)
const origins = ['http://localhost:3000']
const io = new Server(httpServer,{
     cors:{
          origin:(origin,cb)=>{
               if(origin)
                    if(origins.includes(origin))
                    return cb(null,origin)
               return cb(new Error('not allowed by cors'))
     }
}
})
const socketManager = new SocketManager(io)
io.on('connection',(socket)=>{
     socketManager.connect(socket)
})
httpServer.listen(PORT,()=>{
     console.log('server is running on port',PORT)
})

process.on('unhandledRejection',()=>{
     process.exit(1)
})

process.on('uncaughtException',()=>{
     process.exit(1)
})