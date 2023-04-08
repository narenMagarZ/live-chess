import { Container, Grid, Paper, Alert, Snackbar } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Board from "../board"
import Match from "./match"
import Player from "./player"
import { socketContext } from "../../app"
import PlayerLists from "./players-list"
import Emitter from "../../sockets/emitter"
import Events from "../../sockets/events"
function Playground(){
     const socket = useContext(socketContext)
     const [players,setPlayers] = useState<IPlayer[]>([])
     const [you,setYou] = useState<IPlayer|null>(null)
     const [alertMessage,setAlertMessage] = useState('')
     const [alertBoxState,setAlertBoxState] = useState(false)
     const [player,setPlayer] = useState<Player|null>(null)
     const [emitter,setEmitter] = useState<Emitter|null>()
     const [event,setEvent] = useState<Events|null>()
     event?.error((data)=>{
          const {
               message,
               type
          } = data
          console.log(data,'this is data')
          setAlertBoxState(true)
          setAlertMessage(message)
     })
     event?.playerList((data:{
          players:IPlayer[]
     })=>{
          setPlayers(data.players)
     })
     socket.on('createPlayer',(playerInfo)=>{
          console.log(playerInfo,'playerInfo')
          const {
               you,
               players
          } = playerInfo
          const {
               id,
               username
          } = you
          setPlayer(new Player(id,username))
          setPlayers(players)
          setYou(you)
     })

     const [username,setUsername] = useState('')
     function askForUsername(){
          const promptValue = prompt('Enter username...')
          if(!promptValue){
               askForUsername()
          }
          else {
               setUsername(promptValue)
          }
     }

     function handleAlertBoxClose(){
          setAlertBoxState(false)
          setAlertMessage('')
     }
     useEffect(()=>{
          setEmitter(new Emitter(socket))
          setEvent(new Events(socket))
     },[socket])
     useEffect(()=>{
          if(username)
          emitter?.createPlayer(username)
     },[username,emitter])
     useEffect(()=>{
          if(!username)
          askForUsername()
     },[])
     return (
          <Container
          style={{
               height:'100vh'
          }}
          maxWidth='lg'
          >
               <Paper
               sx={{
                    boxShadow:'none',
               }}
               >
                    {
                         alertMessage && <Snackbar open={alertBoxState} autoHideDuration={6000} >
                         <Alert severity="error" 
                         onClose={handleAlertBoxClose}
                         sx={{ width: '100%' }}>
                           {alertMessage}
                         </Alert>
                       </Snackbar>
                    }
               </Paper>               

               <Grid
               container
               justifyContent='center'
               alignItems='center'
               sx={{
                    marginBottom:2,
                    marginTop:5
               }}
               >
               </Grid>
               <Grid
               container
               spacing={2}
               justifyContent='center'
               sx={{
               }}
               >
                    <PlayerLists 
                    you={you}
                    players={players} />
                    <Board/>
               </Grid>
          </Container>
     )
}

export default Playground