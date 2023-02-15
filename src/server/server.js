const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http");
const jwt = require('jsonwebtoken');
const config = require('config');
// const db = require('./db');
const auth = require('./middlewares/auth');
const server = http.createServer(app);
app.use(express.json({ extended: false }));
app.use(cors());
app.post('/login', async (req, res) => {
    const ipAddress = req.socket.remoteAddress;
    const { username, room } = req.body;
    const userInfo = {
        username,
        room
    }
    // const userInfo = await db.query(`insert into t_user (username,ip,room)values($1,$2,$2) returning username,room;`,[username,ipAddress,room]);
    let payload = {
        userInfo
    };
    const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: '3hr',
    });    
    return res.json({ token });
});

app.get('/',auth,async(req,res)=>{
    try {
		// res.json({data : req.userInfo});
	} catch (err) {
		res.status(401).send({ msg: 'Permission denied !' });
	}
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


// app.use('/login', require('./routes/login'));
server.listen(3001, () => console.log(`Server started on port 3001`));
