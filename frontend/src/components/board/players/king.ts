import u from "../../../utils";
import Piece from "./piece";



class King{
     possibleMoves:[number,number][]
     lowerBound:number
     upperBound:number
     size:number
     constructor(){
          this.possibleMoves = []
          this.lowerBound = 0
          this.upperBound = 7
          this.size = 2
     }
     public getPossibleMoves(currentPos:[number,number]){
          // here possible moves are [i-1,j-1] [i-1,j] [i-1,j+1]
          // [i,j-1] [i,j] [i,j+1]
          // [i+1,j-1] [i+1,j] [i+1,j+1]
          let iCounter = 0
          let jCounter = 0
          const [x,y] = currentPos 
          for(let i = x - 1 ;u.gte(i,this.lowerBound) && u.lte(iCounter,2);i++){
               jCounter = 0
               for(let j = y - 1;u.lte(j,this.upperBound) && u.lte(jCounter,2) ;j++){
                    this.possibleMoves.push([i,j])
                    jCounter++
               }
               iCounter++
          }
     }  
}

const king = new King()

king.getPossibleMoves([1,1])
console.log(king.possibleMoves)
export default King

