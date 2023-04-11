import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { EventContext } from "../playground"


function MatchTimer(){

     const event = useContext(EventContext)
     const [timer,setTimer] = useState(1)
     const timerRef = useRef<any>(null)
     const [startTimer,setStartTimer] = useState(false)
     useEffect(()=>{
          if(startTimer){
               timerRef.current = setInterval(()=>{
               setTimer((prev)=>prev+1)  
               },1000)
          }
          return()=>{
               clearInterval(timerRef.current)
          }
     },[startTimer])
     useEffect(()=>{
          event?.startMatchTimer(()=>{
               setStartTimer(true)
          })
          return()=>{
               event?.removeStartMatchTimer()
          }
     },[event])

     return(
          <Box>
               <Typography
               sx={{
                    fontFamily:'cursive',
                    textAlign:'center'
               }}
               >
                    {
                         startTimer && timer
                    }
               </Typography>
          </Box>
     )
}

export default MatchTimer