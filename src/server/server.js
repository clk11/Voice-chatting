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
const { context } = require('./utils/serverContext');
//username

app.use(express.json({ extended: false }));
app.use(cors());


//

app.set('trust proxy', true);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: null
    }
});


io.on("connection", (socket) => {
    socket.on("logout", obj => {
        context.logoff(obj.username, obj.room);
    })
    socket.on("join_room", obj => {
        socket.join(obj.room);
    })
    socket.on("send_message", obj => {
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
        socket.emit("getting_messages", context.rooms.get(room))
    });
})

app.post('/login', async (req, res) => {
    const ipAddress = req.socket.remoteAddress;
    const { username, room } = req.body;
    let checkAll = true;
    let checkRoom = context.users.get(room);
    if (checkRoom == undefined) {
        context.users.set(room, new Map().set(username, 1));
    } else {
        if (checkRoom.get(username) == undefined) {
            context.users.get(room).set(username, 1);
        } else checkAll = false;
    }
    if (checkAll) {
        // await db.query(`insert into t_user (username,room,ip)values($1,$2,$3);`, [username, room, ipAddress]);
    }
    else return res.status(500).send({ err: 'A user with this username was already connected ! Wait until the room is destroyed and try again !\n !!! A room is destroyed when every user logged off the room . ' });
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

app.get('/api', auth, async (req, res) => {
    try {
        res.json({ user: req.user })
    } catch (err) {
        res.status(401).send({ msg: 'Permission denied !' });
    }
});

server.listen(3001, () => console.log(`Server started on port 3001`));
