import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Paper } from '@mui/material'
import axios from 'axios';
import { Grid } from '@mui/material';
const config = {
    'Content-Type': 'application/json',
};
const Login = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleRoomChange = (e) => {
        setRoom(e.target.value);
    }
    const onLoginClick = async () => {
        if (username.length !== 0 && room.length !== 0) {
            let token;
            try {
                token = (await axios.post(`http://localhost:3001/login`, { username, room }, config)).data.token;
                localStorage.setItem('token', token);
                window.location.reload();
            }catch(error){
                console.log(error.response.data.err);
            }
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
                <Paper elevation={5}>
                    <Box padding={3} component="form" noValidate sx={{ mt: 1, textAlign: 'center' }}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button
                                    onClick={onLoginClick}
                                    fullWidth
                                    variant="contained"
                                >
                                    Log in
                                </Button>
                            </Grid>
                            {/* <Grid item xs={6}>
                            <Button
                                onClick={onCreateRoomClick}
                                fullWidth
                                variant="contained"
                                color = "secondary"
                            >
                                Create a room
                            </Button>
                        </Grid> */}
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
export default Login;
