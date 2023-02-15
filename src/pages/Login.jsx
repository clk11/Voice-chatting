import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import AppContext from '../contexts/AppContext';
import setAuthToken from '../server/utils/setAuthToken';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material';
const config = {
    'Content-Type': 'application/json',
};
const Login = () => {
    const { username, setUsername, room, setRoom } = useContext(AppContext);
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleRoomChange = (e) => {
        setRoom(e.target.value);
    }
    const onCreateRoomClick = ()=>{
        let input = prompt('Introduce the name of the room : ');
        if(input.length === 0)alert('You need to enter something !')
        else setRoom(input);
    }
    const onLoginClick = async () => {
        if (username.length !== 0 && room.length !== 0) {
            const result = await axios.post(`http://localhost:3001/login`, { username,setRoom }, config);
            localStorage.setItem('token',result.data.token);
            window.location.reload();
        }
        else alert('You need to complete everything !');
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        onChange={handleUsernameChange}
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        value={username}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        onChange={handleRoomChange}
                        fullWidth
                        id="room"
                        label="room"
                        name="room"
                        value={room}
                        autoFocus
                    />
                    <Grid container spacing = {2}>
                        <Grid item xs={6}>
                            <Button
                                onClick={onLoginClick}
                                fullWidth
                                variant="contained"
                            >
                                Log in
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                onClick={onCreateRoomClick}
                                fullWidth
                                variant="contained"
                                color = "secondary"
                            >
                                Create a room
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default Login;