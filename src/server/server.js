const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http");
const db = require('./config/db');
const server = http.createServer(app);
app.use(express.json())

app.post('/login',async (req,res)=>{
    const ipAddress = req.socket.remoteAddress;
    const {username} = req.body;
    await db.query(`insert into t_user (username,ipAddress)values($1,$2)`,[username,ipAddress]);
});

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: null
//     }
// });

// io.on("connection", (socket) => {
//     socket.on("join_room", room => {
//         socket.join(room);
//     })
//     socket.on("send_message", obj => {
//         socket.broadcast.to(obj.room).emit("received_message", obj);
//         socket.emit("received_message",obj);
//     });    
// })
//Enabling passing data to the body of the req
app.use(cors());


// app.use('/login', require('./routes/login'));
server.listen(80, () => console.log(`Server started on port 80`));
