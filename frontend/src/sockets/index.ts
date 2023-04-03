import io from 'socket.io-client'


const socketUrl = 'http://localhost:5000'
const socket = io(socketUrl)

socket.on('connect',()=>{
     console.log(socket.id)
})

socket.on('disconnect',()=>{
     console.log(socket.id)
})

socket.on('connect_error',()=>{
     console.log('connection error')
     socket.connect(); // try to reconnect
})
export default socket