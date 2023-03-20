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
const { context } = require('./utils/serverContext');
//username

app.use(express.json({ extended: false }));
app.use(cors());


//

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: null
    }
});


io.on("connection", (socket) => {    
    socket.on("join_room", obj => {
        socket.join(obj.room);
    })
    socket.on("send_message", obj => {
        console.log(obj);
        context.addMessage(obj.user.room, obj.user.username, obj.message);
        socket.broadcast.to(obj.user.room).emit("received_message", obj);
    });
    socket.on("get_users", room => {
        let arr = [];
        context.users.get(room).forEach((first, second) => {
            arr.push({ username: second, status: first == 1 ? 'on' : 'off' })
        });
        socket.emit("getting_users", arr);
    });
    socket.on("get_messages", room => {
        console.log(context.rooms.get(room));
        socket.emit("getting_messages", context.rooms.get(room))
    });
})

app.post('/login', async (req, res) => {
    const ipAddress = req.socket.remoteAddress;
    const { username, room } = req.body;
    // if (context.get(room) != undefined && context.get(room).get(username) != undefined) {
    await db.query(`insert into t_user (username,room,ip)values($1,$2,$3);`, [username, room, ipAddress]);
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
    // } else return res.status(500).send({ err: 'Already a user with that username !' });
});

app.get('/', auth, async (req, res) => {
    try {
        res.json({ user: req.user })
    } catch (err) {
        res.status(401).send({ msg: 'Permission denied !' });
    }
});

server.listen(3001, () => console.log(`Server started on port 3001`));
