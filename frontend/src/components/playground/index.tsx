import { Container, TextField, Grid, Paper, List } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import Board from "../board"
import Match from "./match"
import Player from "./player"
import { socketContext } from "../../app"
import PlayerLists from "./players-list"
function Playground(){
     const socket = useContext(socketContext)
     const nameFieldRef = useRef<HTMLInputElement>(null)
     const [players,setPlayers] = useState<IPlayers[]>([])
     let player:Player
     socket.on('create-player',(playerId)=>{
          player = new Player(playerId)
     })
     socket.on('player-list',(players)=>{
          console.log(players)
          setPlayers(players)
     })
     function setUserName(){
          socket.emit('set-name',nameFieldRef.current?.value)
     }
     useEffect(()=>{
          console.log(socket)
     },[socket])
     return (
          <Container
          style={{
               height:'100vh'
          }}
          maxWidth='lg'
          >
               <Grid
               container
               justifyContent='center'
               alignItems='center'
               sx={{
                    marginBottom:2,
                    marginTop:5
               }}
               >
                    <div
                    >
                         <input
                         ref={nameFieldRef}
                         style={{
                              padding:8,
                              borderRadius:6,
                              border:'1px solid #000'
                         }}
                         placeholder="please set your name to start game..."
                         />
                         <button
                         onClick={()=>setUserName()}
                         >
                              Set
                         </button>
                    </div>
               </Grid>
               <Grid
               container
               justifyContent='center'
               sx={{
               }}
               >
                    <PlayerLists players={players} />
                    <Board/>
               </Grid>
          </Container>
     )
}

export default Playground