import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [socket, setsocket] = useState(null);
  const inputref = useRef();
  const [message,setmessage]=useState(["hi there"])

  const sendmessage = () => {
    if (!socket) return;
    const message = inputref.current.value;
  socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: inputref.current.value,
        },
      })
    );
    alert(message)
  };
  

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
   setsocket(ws);
  ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomid: "room1",
          },
        })
      );
    };
   ws.onmessage=(ev)=>{
    setmessage(m=>[...m,ev.data])
   }

    
  }, []);

  return (
   <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
 <div style={{ height: "90%",  backgroundColor: "black" }}>
  {message.map(message=><div style={{borderRadius:"10px",backgroundColor:"white",color:"black"}}>{message}</div>)}
  
    
  
      
    </div>

      <div style={{display:"flex",justifyContent:"space-evenly"}}>
         <input style={{width:"700px",height:"50px",borderRadius:"65px"}} ref={inputref} type="text" placeholder="message" />
      <button style={{background:"purple",borderRadius:"40px",width:"150px"}}onClick={sendmessage}>Send Message</button>
      </div>
     
    </div>
  );
}

export default App;
