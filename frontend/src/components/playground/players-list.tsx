import { List, ListItem, ListItemText,Container,
      Grid, Paper, Button, Box } from "@mui/material"
import { useContext, useState } from "react"
import { PlayerEmitterContext } from "."
import { socketContext } from "../../app"
type t = {
     players:IPlayer[],
     you:IPlayer|null
}
function PlayerLists({
     players,
     you
}:t){

     const socket = useContext(socketContext)
     const playerEmitter = useContext(PlayerEmitterContext)
     const [matchState,setMatchState] = useState<TMatchState>('idle')
     function handleMatch(){
          setMatchState('matching')
     }
     function handleMatchRequest(player:IPlayer){
          playerEmitter?.friendlyMatchRequest(player)
     }
     function handleRandomMatchRequest(player:IPlayer){

     }
     return(
          <Grid item>
               <List>
                    {
                         players.map(({
                              username,
                              id,
                              state
                         },i)=>(
                              <ListItem
                              sx={{
                                   cursor:'pointer'
                              }}
                              key={i}
                              >
                                   <Paper
                                   sx={{
                                        padding:1
                                   }}
                                   >
                                        {username}&nbsp;
                                        {
                                             state !== 'idle' ? `(${state})`:
                                             you?.id === id ? 
                                             <span
                                             className="fc-red fw-bold"
                                             >
                                                  (you)
                                             </span>
                                             :
                                             <button 
                                             onClick={()=>handleMatchRequest({
                                                  id,
                                                  username,
                                                  state
                                             })}
                                             className="play-btn">
                                                  play
                                             </button>
                                        }
                                   </Paper>
                              </ListItem>
                         ))
                    }
                    <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    sx={{boxShadow:'none'}}
                    >
                         <button
                         onClick={handleMatch}
                         >
                              {
                                   matchState === 'idle' ? 'match' : 
                                   matchState === 'matching' ? 'matching...' : 'playing'
                              }
                         </button>
                    </Box>
               </List>
          </Grid>
     )
}

export default PlayerLists