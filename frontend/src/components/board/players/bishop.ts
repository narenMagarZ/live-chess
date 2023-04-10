import u from "../../../utils"
class Bishop{
     possibleMoves:[number,number][]
     lowerBound:number
     upperBound:number
     constructor(){
          this.lowerBound = 0
          this.upperBound = 7
          this.possibleMoves = []
     }
     public getPossibleMoves(currentPos:[number,number]){
          const [x,y] = currentPos
          let i=x
          let j=y
          for(let i=0;i<2;i++){
               let t = -1
               let a = x
               let b = y
               let c = y
               for(;;){
                    a = a+(1*t)
                    b=b-1
                    c=c+1
                    
                    this.possibleMoves.push([a,b])
                    this.possibleMoves.push([a,c])
               }
               t = 1
          }
          for(;;){
               i=i-1
               j=j-1
               if(i<this.lowerBound || j<this.lowerBound)
                    break
               this.possibleMoves.push([i,j])
          }
          i=x 
          j=y
          for(;;){
               i=i+1
               j=j+1
               if(i>this.upperBound||j>this.upperBound)
               break
               this.possibleMoves.push([i,j])
          }
          i=x
          j=y
          for(;;){
               i=i-1
               j=j+1
               if(i<this.lowerBound||j>this.upperBound)
               break
               this.possibleMoves.push([i,j])
          }
          i=x
          j=y
          for(;;){
               i=i+1
               j=j-1
               if(i>this.upperBound||j<this.lowerBound)
               break
               this.possibleMoves.push([i,j])
          }
     }
}

export default Bishop