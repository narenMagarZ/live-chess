import {Server, Socket} from 'socket.io'
import MatchEvent from './match-event';
import Players from '../model/player-list';
import Events from './events';
import PlayerEvent from './player-event';
import Matches from '../model/matches';

class SocketManager {
     io:Server;
     players:Players
     constructor(io:Server){
          this.io = io
          this.players = new Players()
     }
     public connect(socket:Socket,matches:Matches){
          const event = new Events(socket,this.players,this.io)
          event.createPlayer((player,players)=>{
               const playerEvent = new PlayerEvent(player,socket,players,this.io)
               playerEvent.friendlyMatchRequest()
               playerEvent.acceptMatchRequest(matches,(match,player1,player2,player1Socket)=>{
                    const player1MatchEvent = new MatchEvent(player1Socket,player1,players,this.io,match,'player1')
                    const player2MatchEvent = new MatchEvent(socket,player2,players,this.io,match,'player2')
                    player1MatchEvent.movePiece()
                    player2MatchEvent.movePiece()
               })
               playerEvent.rejectMatchRequest()
               playerEvent.cancelMatchRequest()
               playerEvent.noMatchRequestResponse()
          })
     }
}
export default SocketManager