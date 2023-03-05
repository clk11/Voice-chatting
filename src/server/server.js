const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http");
const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('./db');
const auth = require('./middlewares/auth');
const server = http.createServer(app);
const { Server } = require("socket.io");

//

app.use(express.json({ extended: false }));
app.use(cors());

//


let users = new Map();



function addUser(room, newUser) {
    let arr = users.get(room)
    if (arr != undefined) {
        arr.push(newUser);
        users = new Map(users).set(room, arr);
    } else
        users = new Map(users).set(room, [newUser]);
}

function removeUser(room,user){
    let arr = users.get(room);
    
}


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: null
    }
});


io.on("connection", (socket) => {
    socket.on('disconnecting',obj=>{

    })
    socket.on("join_room", obj => {
        addUser(obj.room, obj.username);
        socket.join(obj.room);
    })
    socket.on("send_message", obj => {
        socket.broadcast.to(obj.user.room).emit("received_message", obj);
    });
    socket.on("get_users", room => {
        const entries = users.get(room);
        socket.emit("getting_users", entries);
    });
})

app.post('/login', async (req, res) => {
    const ipAddress = req.socket.remoteAddress;
    const { username, room } = req.body;
    // await db.query(`insert into t_user (username,room,ip)values($1,$2,$3);`, [username, room, ipAddress]);
    const user = {
        username,
        room
    }
    let payload = {
        user
    };
    const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: '2h',
    });
    return res.json({ token });
});

app.get('/', auth, async (req, res) => {
    try {
        res.json({ user: req.user })
    } catch (err) {
        res.status(401).send({ msg: 'Permission denied !' });
    }
});

server.listen(3001, () => console.log(`Server started on port 3001`));
