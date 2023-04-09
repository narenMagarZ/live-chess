import { Container, Grid } from "@mui/material"
import { createContext, useEffect, useReducer, useState } from "react"
import Board from "../board"
import Match from "./match"
import Player from "./player"
import PlayerLists from "./players-list"
import Emitter from "../../sockets/emitter"
import Events from "../../sockets/events"
import PlayerEmitter from "../../sockets/player-emitter"
import socket from "../../sockets"
import { Socket } from "socket.io-client"
import AlertBox from "../alertbox"
const event = new Events(socket)
const emitter = new Emitter(socket)
export const PlayerEmitterContext = createContext<PlayerEmitter|null>(null)
export const SocketContext = createContext<Socket>(socket)
export const EventContext = createContext<Events|null>(null)
function Playground(){
     const [state,dispatch] = useReducer((state:IPlaygroundState,action:{
          type:string,
          payload:any
     })=>{
          const {type,payload} = action
          if(type==='PLAYERS'){
               return {
                    ...state,
                    players:payload
               }
          }
          else if(type === 'YOU'){
               return {
                    ...state,
                    you:payload
               }
          }
          else if(type==='PLAYERS_AND_YOU'){
               return {
                    you:payload.you,
                    players:payload.players
               }
          }
          else return state
     },{
          players:[],
          you:null,
     })
     const [alertMessage,setAlertMessage] = useState('')
     const [player,setPlayer] = useState<Player|null>(null)
     const [playerEmitter,setPlayerEmitter] = useState<PlayerEmitter|null>(null)
     const [username,setUsername] = useState('')


     event.playerList((data:{
          players:IPlayer[]
     })=>{
          dispatch({
               type:'PLAYERS',
               payload:data.players
          })
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
          dispatch({
               type:'PLAYERS_AND_YOU',
               payload:{
                    players,
                    you
               },

          })
     })

     function askForUsername(){
          const promptValue = prompt('Enter username...')
          if(!promptValue){
               askForUsername()
          }
          else {
               setUsername(promptValue)
          }
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
          event.matchRequest()
          return()=>{
               event.removeALlListener()
          }
     })
     return (
          <SocketContext.Provider value={socket}>
               <EventContext.Provider
               value={event}
               >

                    <Container
                    style={{
                         height:'100vh',
                         justifyContent:'center',
                         alignItems:'center',
                         display:'flex'

                    }}
                    maxWidth='lg'
                    >
                         <AlertBox
                         />
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
                                   you={state.you}
                                   players={state.players} />
                                   <Board/>
                              </PlayerEmitterContext.Provider>
                         </Grid>
                    </Container>
               </EventContext.Provider>
          </SocketContext.Provider>

     )
}

export default Playground