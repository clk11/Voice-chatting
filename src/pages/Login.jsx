import React, { useState,useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { LoginContext } from '../contexts/LoginContext';
const config = {
	'Content-Type': 'application/json',
};
const Login = () => { 
    const context = useContext(LoginContext);
    const {isAuth} = context;
    let username;
    useEffect(()=>{
        console.log(isAuth);
    },[])
    const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};
    const onLoginClick = async ()=>{
        // if(username.length !== 0){
        //     await axios.post(`http://localhost:80/login`,{username},config);
        // }
        // else alert('Username cannot be empty !');
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter your username : 
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
                        value = {username}
                        autoFocus
                    />
                    <Button
                        onClick={onLoginClick}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log in
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
export default Login;