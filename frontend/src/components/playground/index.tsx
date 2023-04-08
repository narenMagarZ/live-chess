import { Container, Grid, Paper, Alert, Snackbar } from "@mui/material"
import { createContext, useEffect, useState } from "react"
import Board from "../board"
import Match from "./match"
import Player from "./player"
import PlayerLists from "./players-list"
import Emitter from "../../sockets/emitter"
import Events from "../../sockets/events"
import PlayerEmitter from "../../sockets/player-emitter"
import socket from "../../sockets"
import { Socket } from "socket.io-client"
export const PlayerEmitterContext = createContext<PlayerEmitter|null>(null)
export const SocketContext = createContext<Socket>(socket)

const event = new Events(socket)
const emitter = new Emitter(socket)
function Playground(){
     const [players,setPlayers] = useState<IPlayer[]>([])
     const [you,setYou] = useState<IPlayer|null>(null)
     const [alertMessage,setAlertMessage] = useState('')
     const [alertBoxState,setAlertBoxState] = useState(false)
     const [player,setPlayer] = useState<Player|null>(null)
     const [playerEmitter,setPlayerEmitter] = useState<PlayerEmitter|null>(null)
     event.error((data)=>{
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
     console.count('render count')
     socket.on('createPlayer',(playerInfo)=>{
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
          if(player){
               setPlayerEmitter(new PlayerEmitter(player,socket))
          }
     },[player])
     useEffect(()=>{
          if(username)
          emitter.createPlayer(username)
     },[username])
     useEffect(()=>{
          if(!username)
          askForUsername()
     },[])
     useEffect(()=>{
          console.log('attaching listeneres')
          event.matchRequest()
          return()=>{
               console.log('removing listenerers')
               event.removeALlListener()
          }
     })
     return (
          <SocketContext.Provider value={socket}>
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
                    <PlayerEmitterContext.Provider
                    value={playerEmitter}
                    >                         
                         <PlayerLists 
                         you={you}
                         players={players} />
                         <Board/>
                    </PlayerEmitterContext.Provider>
               </Grid>
          </Container>
          </SocketContext.Provider>

     )
}

export default Playground