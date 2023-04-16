interface IChessCell {
     position:TPiecePosition
     bgColor:string
     player:TPiece|null
     playerPath:string
     type:TPieceType
     isHighLighted?:boolean
     opacity?:0.3
}
type TPiece = 'pawn'|'rook'|'knight'|'bishop'|'queen'|'king'
type TChessCell = {
     cellProps:IChessCell,
     onClick?:()=>void,
}
type TPiecePosition = {
     x:number,
     y:number
}

type TPieceType = 'host'|'remote'|null

type TPlayerState = 'idle'|'playing'

interface IPlayer{
     id:string
     username:string
     state:TPlayerState
}
type TMatchState = 'playing'|'matching'|'idle'
type TSocketError = {
     message:string,
     type:string
}

type TUNull = null | undefined
interface IPlaygroundState{
     players:IPlayer[]
     you:IPlayer
}

type TPossibleMoves=[number,number][]
type TPieces = IChessCell[][]
type TCurrentPos = [number,number]
interface IPlayers{
     you:{
          username:string
          type:'player1'|'player2'|null
     }
     opponent:{
          username:string
          type:'player1'|'player2'|null
     }
}


interface IDialogBox {
     title:string
     message:string
     action:string[]
     funcs:any[]
     timer?:number
} 
interface IDialogBoxAction {
     type:string
     payload:string
}

interface IPlayerCard{
     id:string
     username:string
     state:string
     isYou?:boolean
     isRequestedForMatch?:boolean
}