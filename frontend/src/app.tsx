import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import './app.css';
import Playground from './components/playground';
import socket from './sockets';

export const socketContext = createContext<Socket>(socket)
function App() {
  return (
    <socketContext.Provider
    value={socket}
    > 
      <Playground/>
    </socketContext.Provider>
  );
}

export default App;
