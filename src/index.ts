import {WebSocketServer,WebSocket}from "ws";


interface User{
  Socket:WebSocket,
  Room:string
}
let allsockets:User[]=[];
const wss = new WebSocketServer({port:8080})
wss.on("connection",function(socket){
 
   

    socket.on("message",(message)=>{
        //@ts-ignore
        // console.log(message.toString())
        const parseddata=JSON.parse(message)
      if(parseddata.type==="join"){
          allsockets = allsockets.filter((x) => x.Socket !== socket);
        allsockets.push({
            Socket:socket,
            Room:parseddata.payload.roomid
        })
        console.log("connected")
      }
      if(parseddata.type==="chat"){
        const currentroom=allsockets.find((x)=>x.Socket==socket)
        // console.log(allsockets)
        allsockets.forEach((x)=>{
            if(x.Room==currentroom?.Room){
                x.Socket.send(parseddata.payload.message)
            }
            
        })
      }



});
  

        
    } )
  
    