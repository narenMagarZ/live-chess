import {Server, Socket} from 'socket.io'
import Player from '../model/player';
import PlayerList from '../model/player-list';
import generatePlayerId from '../utils/generate-player-id';
import Events from './events';

class SocketManager {
     io:Server;
     players:PlayerList
     constructor(io:Server){
          this.io = io
          this.players = new PlayerList()
     }
     public connect(socket:Socket){
          const playerId = generatePlayerId()
          const player = new Player(playerId)
          socket.join(playerId)
          socket.emit('player-list',[...this.players.getPlayers()])
          const event = new Events(socket,player,this.players)
          event.setPlayerName()
          event.disconnect()
     }
}
export default SocketManager