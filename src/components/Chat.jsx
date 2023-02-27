import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { List, ListItem, Typography, Paper, Container, Button, IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useState, useEffect } from 'react';

const Chat = ({ logout,user }) => {
    const [recording, setRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        let interval = null;
        if (recording) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!recording && seconds !== 0)
            clearInterval(interval);
        return () => clearInterval(interval);
    }, [recording, seconds]);  
    const onRecord = () => {
        if (recording) {
            setSeconds(0);
            setRecording(false);
        }else setRecording(true);
    }  
    return (
        <Container style={{ paddingTop: '50px', width: '500px' }}>
            <Paper elevation={5} sx={{ borderStyle: 'solid', borderColor: 'Grey' }}>
                <Box p={2}>
                    <Grid container spacing={6}>
                        <Grid item xs={8}>
                            <Typography variant='h6' gutterBottom>
                                {'Room : ' + user.room}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={logout} variant="contained" >Log off</Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Grid sx={{ height: '20rem' }} xs={12} item>
                            <List sx={{ height: '20rem', overflow: 'auto' }}>
                                <ListItem divider>
                                    <Button fullWidth sx={{ color: 'Bla' }}>Alex</Button>
                                </ListItem>
                                <ListItem divider>
                                    <Button fullWidth>Robert</Button>
                                </ListItem>
                                <ListItem divider>
                                    <Button fullWidth sx={{ color: 'Bla' }}>Alex</Button>
                                </ListItem>
                                <ListItem divider>
                                    <Button fullWidth>Robert</Button>
                                </ListItem>
                                <ListItem divider>
                                    <Button fullWidth sx={{ color: 'Bla' }}>Alex</Button>
                                </ListItem>
                                <ListItem divider>
                                    <Button fullWidth>Robert</Button>
                                </ListItem>
                                <ListItem divider>
                                    <Button fullWidth sx={{ color: 'Bla' }}>Alex</Button>
                                </ListItem>
                                <ListItem divider>
                                    <Button fullWidth>Robert</Button>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item sx={{ paddingTop: '20px' }}>
                            <IconButton
                                onClick={onRecord}
                                aria-label='send'
                                color={recording ? 'error' : 'primary'}
                            >
                                <KeyboardVoiceIcon />
                                {recording && (
                                    <Typography>
                                        {seconds}s
                                    </Typography>
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default Chat