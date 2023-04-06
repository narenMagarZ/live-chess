import Piece from "./piece"

class Pawn extends Piece{
     public findCell(){
          const x = this.position.x
          const y = this.position.y
          const pos = `${x.toString()}-${y.toString()}`
          this.cell = document.querySelector(`[data-pos="${pos}"]`)
     }
     public findPossiblePath(): void {
          if(this.cell){
               const [i,j] = this.cell.dataset.pos?.split('-') || []
               if(i && j){
                    const posX = parseInt(i)
                    const posY = parseInt(j)
                    const paths = [[posX-1,posY],[posX-1,posY-1],[posX-1,posY+1]]
                    for(let i of paths){
                         console.log(i)
                         const [lowerBound,uppperBound] = i
                         if(lowerBound !>= this.lowerBound && 
                              uppperBound !<= this.uppperBound){
                                   super.findCell(lowerBound,uppperBound)
                         }
                    }

               }

          }
     }
}

export default Pawn