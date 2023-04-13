import { Socket } from 'socket.io';
import Player from '../model/player';
import Match from '../model/match'
import u from '../utils';
import Matches from '../model/matches';
import Events from './events'
import Players from '../model/player-list';
import { Server } from 'socket.io';

class MatchEvent extends Events{
     match:Match
     constructor(socket:Socket,players:Players,io:Server,match:Match){
          super(socket,players,io)
          this.match = match
     }
     public movePiece(){
          this.socket.on('movePiece',(data)=>{
               console.log(data,'these are data from match event')
               const {
                    lastPos,
                    newPos,
                    isPieceMurdered,
                    isKingMurdered
               }=data
               const {player1,player2, movementTurn} = this.match
               
               if(isKingMurdered){
                    this.match.isKingMurdered = true
                    // now its time to end the game
                    // now remove all the sockets or player connected to this match
                    // emit the matchEnd event
               }
               if(isPieceMurdered){
                    this.match.leftPieces--
                    this.match.killedPieces++
               }
               const [lX,lY] = lastPos
               const [nX,nY]=newPos

               const newMovementTurn = movementTurn === 'player1' ? 'player2' : 'player1'
               // here needs to calculate the new position using pos where pos is in the
               // form of [x,y]
               const matchId = this.match.getMatchId
               
               // here we are using room to emit the event because
               // it only emit the events for other all connected sockets except itself

               this.socket.to(matchId).emit('movePiece',{
                    lastPos:[Math.abs(7-lX),Math.abs(7-lY)],
                    newPos:[Math.abs(7-nX),Math.abs(7-nY)],
               })
               

          })
     }
}

export default MatchEvent