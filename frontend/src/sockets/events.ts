import { Socket } from 'socket.io-client';


class Events {
     socket:Socket
     constructor(socket:Socket){
          this.socket = socket
     }
     public error(cb:(data:TSocketError)=>void){
          this.socket.on('error',cb)
     }
     public playerList(cb:(data:{
          players:IPlayer[]
     })=>void){
          this.socket.on('playerList',cb)
     }
     public askForAcceptOrRejectMatchRequest(cb:(data:any)=>void){
          this.socket.on('acceptOrRejectMatchRequest',cb)
     }
     public info(cb:(data:any)=>void){
          this.socket.on('info',cb)
     }
     public cancelMatchRequest(cb:()=>void){
          this.socket.on('cancelMatchRequest',cb)
     }
     acceptMatchRequest(cb:(data:any)=>void){
          this.socket.on('acceptMatchRequest',cb)
     }
     removeAcceptMatchRequest(){
          this.socket.removeAllListeners('acceptMatchRequest')
     }
     public rejectMatchRequest(cb:(data:any)=>void){
          this.socket.on('rejectMatchRequest',cb)
     }
     public removeRejectMatchRequest(){
          this.socket.removeListener('rejectMatchRequest')
     }
     public removeALlListener(){
          this.socket.removeAllListeners('acceptOrRejectMatchRequest')
     }
     public removeCancelRequest(){
          this.socket.removeAllListeners('cancelMatchRequest')
     }
     startMatchTimer(cb:()=>void){
          this.socket.on('startMatchTimer',cb)
     }
     movePiece(cb:(data:any)=>void){
          this.socket.on('movePiece',cb)
     }
     removeStartMatchTimer(){
          this.socket.removeListener('startMatchTimer')
     }
     startMatch(cb:(data:any)=>void){
          this.socket.on('startMatch',cb)
     }
     removeStartMatch(){
          this.socket.removeListener('startMatch')
     }
     removeMovePiece(){
          this.socket.removeListener('movePiece')
     }
}
export default Events