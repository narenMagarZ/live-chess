import { List, ListItem, ListItemText,Container,
      Grid, Paper, Button, Box } from "@mui/material"
import { useContext } from "react"
import { socketContext } from "../../app"

type t = {
     players:IPlayers[]
}
function PlayerLists({
     players
}:t){

     const socket = useContext(socketContext)
     return(
          <Grid item>
               <List>
                    {
                         players.map(({
                              name,
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
                                        {name}
                                        &nbsp;(state)
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
                         <Button
                         onClick={()=>socket.emit('match-game',{
                              player:'naren magar',
                              id:123
                         })}
                         variant="contained"
                         color='primary'
                         >
                              Match
                         </Button>
                    </Box>
               </List>
          </Grid>
     )
}

export default PlayerLists