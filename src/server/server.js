const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http");
const jwt = require('jsonwebtoken');
const config = require('config');
// const db = require('./db');
const auth = require('./middlewares/auth');
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(express.json({ extended: false }));
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: null
    }
});

io.on("connection", (socket) => {
    socket.on("join_room", obj => {
        socket.join(obj.room);
        console.log('joined');
    })
    socket.on("send_message", obj => {
        console.log(obj);
        socket.broadcast.to(obj.room).emit("received_message", obj);
    });    
})

app.post('/login', async (req, res) => {
    const ipAddress = req.socket.remoteAddress;
    const { username, room } = req.body;
    const user = {
        username,
        room
    }
    let payload = {
        user
    };
    const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: '1h',
    });    
    return res.json({ token });
});

app.get('/',auth,async(req,res)=>{
    try {
        res.json({user : req.user})
	} catch (err) {
		res.status(401).send({ msg: 'Permission denied !' });
	}
});

server.listen(3001, () => console.log(`Server started on port 3001`));
