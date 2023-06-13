import { Server } from "socket.io";

let io

export const init= (httpServer) => {
    io = new Server(httpServer)
    
    io.on("connection", (clientSocket)=>{

        console.log("client connected", clientSocket.id)
    
        clientSocket.emit('inicio', 'hola desde el servidor');

        clientSocket.on('mensaje-cliente', (data) => {

            console.log('data: ' + data);
    })
})
}
