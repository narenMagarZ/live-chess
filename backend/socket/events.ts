import { Server, Socket } from 'socket.io';
import Match from '../model/match';
import Player from '../model/player';
import PlayerList from '../model/player-list';
import Matches from '../model/matches';
import u from '../utils'
import Players from '../model/player-list';

class Events {
     io:Server
     socket:Socket
     players:PlayerList
     constructor(socket:Socket,playersList:PlayerList,io:Server){
          this.socket = socket
          this.players = playersList
          this.io = io
     }
     public createPlayer(cb:(player:Player,players:Players)=>void){
          this.socket.on('createPlayer',({username})=>{
               const isPlayerNameAlreadyExist = this.players.getPlayers().some(({username:playerName})=>playerName===username)
               if(isPlayerNameAlreadyExist){
                    this.socket.emit('error',{
                         message:'Username already exist!',
                         type:'username already exist'
                    })
               }else {
                    const playerId = u.generateId()
                    const player = new Player(playerId,username)
                    this.players.addPlayer(player)
                    this.socket.join(playerId)
                    this.socket.emit('createPlayer',{
                         you:{
                              id:playerId,
                              username,
                              state:'idle'
                         },
                         players:[...this.players.getPlayers()]
                    })
                    this.socket.broadcast.emit('playerList',{
                         players:[...this.players.getPlayers()]
                    })
                    cb(player,this.players)
               }
          })
     }

}

export default Events