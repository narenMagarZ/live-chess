import { Socket } from 'socket.io';
import Match from '../model/match'
import Events from './events'
import Players from '../model/player-list';
import { Server } from 'socket.io';
import Player from '../model/player';

type TPlayerType = 'player1'|'player2'
class MatchEvent extends Events{
     match:Match
     player:Player
     playerType:TPlayerType
     constructor(socket:Socket,player:Player,players:Players,io:Server,match:Match,playerType:TPlayerType){
          super(socket,players,io)
          this.match = match
          this.player = player
          this.playerType = playerType
     }
     public movePiece(){
          this.socket.on('movePiece',(data)=>{
               console.log(data,'these are data from match event')
               const {
                    lastPos,
                    newPos,
                    isPieceMurdered,
                    isKingMurdered,
                    playerType
               }=data
               const {player1,player2, movementTurn} = this.match
               const matchId = this.match.getMatchId
               if(isKingMurdered){
                    this.match.isKingMurdered = true
                    this.socket.to(matchId).emit('matchEnd',{
                         message:'you loss the match, better luck next time!'
                    })
                    this.socket.emit('matchEnd',{
                         message:'you win the match, congrats!'
                    })
                    return
                    // if(playerType==='player1' && playerType===this.playerType){
                    //      // here distinguish which one is player1 and player2

                    // }else {

                    // }
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
               this.match.movementTurn = newMovementTurn
               // here needs to calculate the new position using pos where pos is in the
               // form of [x,y]
               
               // here we are using room to emit the event because
               // it only emit the events for other all connected sockets except itself

               this.socket.to(matchId).emit('movePiece',{
                    lastPos:[Math.abs(7-lX),Math.abs(lY)],
                    newPos:[Math.abs(7-nX),Math.abs(nY)],
                    movementTurn:newMovementTurn
               })
               

          })
     }
}

export default MatchEvent