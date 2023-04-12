

class Piece{
     public lowerBound:number
     public upperBound:number
     possibleMoves:TPossibleMoves
     pieces:TPieces
     constructor(pieces:TPieces){
          this.lowerBound = 0
          this.upperBound = 7
          this.possibleMoves = []
          this.pieces = pieces
     }
     public getPossibleMoves(currentPos:TCurrentPos){}
     highlightPossibleMoves(){
          for(let move of this.possibleMoves){
               const [x,y] = move
               const piece = this.pieces[x][y]
               piece.isHighLighted = true
          }
          return this.pieces
     }
     unhighLightPossibleMoves(){
          for(let move of this.possibleMoves){
               const [x,y] = move
               const piece = this.pieces[x][y]
               piece.isHighLighted = false
          }
          return this.pieces
     }


}

export default Piece