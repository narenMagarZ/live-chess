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
     updatePlayerList(cb:(data:any)=>void){
          this.socket.on('updatePlayerList',cb)
     }
     removeUpdatePlayerList(){
          this.socket.removeAllListeners('updatePlayerList')
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
     
     matchInfo(cb:(data:any)=>void){
          this.socket.on('matchInfo',cb)
     }
     movePiece(cb:(data:any)=>void){
          this.socket.on('movePiece',cb)
     }
     startMatch(cb:(data:any)=>void){
          this.socket.on('startMatch',cb)
     }
     matchEnd(cb:(data:any)=>void){
          this.socket.on('matchEnd',cb)
     }
     leftMatch(cb:(data:any)=>void){
          this.socket.on('leftMatch',cb)
     }
     removeMatchEnd(){
          this.socket.removeListener('matchEnd')
     }
     removeStartMatch(){
          this.socket.removeListener('startMatch')
     }
     removeMovePiece(){
          this.socket.removeListener('movePiece')
     }
     removeMatchInfo(){
          this.socket.removeListener('matchInfo')
     }
     removePlayerList(){
          this.socket.removeListener('playerList')
     }
     removeLeftMatch(){
          this.socket.removeListener('leftMatch')
     }

     
}
export default Events