import { Server, Socket } from 'socket.io';
import Match from '../model/match';
import Matches from '../model/matches';
import Player from "../model/player"
import Players from '../model/player-list';
import u from '../utils';
import Events from './events';

class PlayerEvent extends Events{
     player:Player
     constructor(player:Player,socket:Socket,players:Players,io:Server){
          super(socket,players,io)
          this.player = player
     }
     public friendlyMatchRequest(){
          this.socket.on('friendlyMatchRequest',(data)=>{
               console.log(data,'for friendly match request')
               // send request to the opponent for match request
               const {opponentId} = data
               const opponent = this.players.findPlayer(opponentId)
               if(opponent){
                    this.socket.to(opponentId).emit('acceptOrRejectMatchRequest',{
                         message:`${this.player.username} ask for match request`,
                         requestedBy:this.player.playerId
                    })
               }
          })
     }
     public cancelMatchRequest(){
          this.socket.on('cancelMatchRequest',(data)=>{
               const {opponentId}= data
               this.socket.to(opponentId).emit('cancelMatchRequest')
               this.socket.to(opponentId).emit('info',{
                    message:`${this.player.username} cancels the match request`
               })
          })
     }
     public randomMatchRequest(){
          this.socket.on('randomMatchRequest',()=>{
               console.log('this is random match request')
               
          })
     }
     public rejectMatchRequest(){
          this.socket.on('rejectMatchRequest',(data)=>{
               console.log(data,'reject the request')
               const {requestedBy} = data
               this.socket.to(requestedBy).emit('info',{
                    message:`${this.player.username} reject your match request`
               })
               this.socket.to(requestedBy).emit('rejectMatchRequest',{id:this.player.playerId})
          })
     }
     public acceptMatchRequest(matches:Matches,cb:(match:Match,player1Socket:Socket)=>void){
          this.socket.on('acceptMatchRequest',(data)=>{
               const {requestedBy} = data
               const matchId = u.generateId()
               // this is the player who send the match request, 
               // hence assigned as player1
               const player1 = this.players.findPlayer(requestedBy)
               const player2 = this.player
               if(!player1)
                    return
                    const match = new Match(matchId,player1,player2)
                    matches.addMatch(match)
                    player1.state = 'playing'
                    player2.state = 'playing'
                    match.movementTurn = 'player1'
                    const roomSockets = this.io.of('/').sockets
                    let player1Socket
                    for(const [_key,socket] of roomSockets){
                         const socketRooms = socket.rooms
                         if(socketRooms?.has(requestedBy)){
                              player1Socket = socket
                              break
                         }
                    }
                    if(player1Socket){
                         player1Socket.join(matchId)
                         this.socket.join(matchId)
                         cb(match,player1Socket)
                         const data={
                              id1:player1.playerId,
                              id2:player2.playerId
                         }
                         player1Socket.emit('acceptMatchRequest',{id:player2.playerId})
                         this.io.to(matchId).emit('startMatchTimer')
                         this.io.to(matchId).emit('startMatch',data)
                         player1Socket.emit('movePiece')
                         this.socket.emit('matchInfo',{
                              opponent:player1.username
                         })
                         player1Socket.emit('matchInfo',{
                              opponent:player2.username
                         })
                    }
          })
     }
     public noMatchRequestResponse(){
          this.socket.on('noMatchRequestResponse',(data)=>{
               const {opponentId} = data
               console.log(opponentId,'request by bro')
               this.socket.to(opponentId).emit('info',{
                    message:`${this.player.username} shows no response!`
               })
               this.socket.to(opponentId).emit('rejectMatchRequest',{id:this.player.playerId})
          })
     }


}

export default PlayerEvent