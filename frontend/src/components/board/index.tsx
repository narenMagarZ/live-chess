import { Grid, Paper } from "@mui/material"
import ChessCell from "./chess-cell"
import Piece from "./players/piece"
import Pawn from "./players/pawn"
import Cell from "./players/cell"

function Board(){
     const board = new Array(8).fill(new Array(8).fill((null)))
     const players = ['rook.svg','knight.svg','bishop.svg','king.svg','queen.svg','bishop.svg','knight.svg','rook.svg']
     const hostPath = '/pieces/host/'
     const remotePath = '/pieces/remote/'
     let lastMovedPlayerType:TPieceType = null
     let movementTurn:TPieceType = null
     const cellP = new Cell()
     let activePlayer:Piece|undefined
     for (let i = 0; i < 8; i++) {
          board[i] = [];
          for (let j = 0; j < 8; j++) {
               let cellProps : IChessCell = {
                    bgColor:'',
                    position:{
                         x:i,
                         y:j
                    },
                    player:null,
                    playerPath:'',
                    type:null
               }
               if(i===0 || i===1){
                    if(i===0){
                         cellProps.playerPath = remotePath+players[j]
                         cellProps.player = players[j].split('.')[0]
                         
                    }else { 
                         cellProps.playerPath = remotePath+'pawn.svg'
                         cellProps.player = 'pawn'
                    }
                    cellProps.type = 'remote'
               } else if(i===6||i===7){
                    if(i===6){
                         cellProps.playerPath = hostPath+'pawn.svg'
                         cellProps.player = 'pawn'
                    }else{
                         cellProps.playerPath = hostPath+players[j]
                         cellProps.player = players[j].split('.')[0]
                    }
                    cellProps.type = 'host'
               }
               if((i+j)%2===0){
                    cellProps.bgColor = '#ffffff'
               }else {
                    cellProps.bgColor = '#ff0000'
               }
               board[i][j] = {...cellProps}
          }
        }
     function test(cell:IChessCell){
          const {
               position,
               type,
               player
          } = cell
          if(activePlayer){
               // return 
               console.log(activePlayer.position,'activePlayer')
               if(type===lastMovedPlayerType){
                    activePlayer.unhighlightCell()
                    cellP.removeAllCell()
               }
          }
          if(type && player){
               if(player === 'pawn'){
                    const piece = new Pawn(position,type,cellP)
                    piece.findCell()
                    piece.findPossiblePath()
                    activePlayer = piece  
                    lastMovedPlayerType = 'host'  
               }
          }
     }
     return(
               <Grid 
               item
               sx={{
               }}
               >
                    <Paper
                    sx={{boxShadow:'none'}}
                    >
                         <Grid 
                         sx={{
                              border:'1px solid #000'
                         }}
                         container direction='column'>
                              {
                                   board.map((row,rowIndex)=>(
                                        <Grid container item key={rowIndex}>
                                             {
                                                  row.map((cell:any,cellIndex:any)=>(
                                                      <ChessCell
                                                      onClick={()=>test(cell)}
                                                      cellProps={cell}
                                                      key={`${rowIndex}-${cellIndex}`} />
                                                  ))
                                             }
                                        </Grid>
                                   ))
                              }
                         </Grid>
                    </Paper>
               </Grid>
     )
}

export default Board