import * as React from 'react';
import { Typography, Paper, Container, Button, IconButton, Grid, Box } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useState, useEffect } from 'react';
import VoiceMessages from './VoiceMessages';
import vmsg from "vmsg";
import ProgressBar from './ProgressBar'
import ChatUsers from './ChatUsers';

const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});

const ChatComponent = ({ logout, user, socket }) => {
    //Modal
    const [open, setOpen] = useState(false);
    //
    const [isRecording, setRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [recordings, setRecordings] = useState([]);
    //
    useEffect(() => {
        return async () => {
            await getMessages();
        }
    }, [])
    useEffect(() => {
        return async () => {
            await socket.on('received_message', obj => {
                obj.message = URL.createObjectURL(new Blob([obj.message], { type: "audio/mpeg" }))
                setRecordings((rec) => [...rec, { message: obj.message, username: obj.user.username }]);
            });
            await socket.on('getting_users', obj => {
                setUsers(obj);
            });
            await socket.on('getting_messages', obj => {
                if (obj == null) setRecordings([]);
                else {
                    obj.forEach(item => {
                        item.message = URL.createObjectURL(new Blob([item.message], { type: "audio/mpeg" }))
                    });
                    setRecordings(obj);
                }
            });
        };
    }, [socket])
    useEffect(() => {
        if (seconds == 1) setLoading(false);
        let interval = null;
        if (isRecording)
            interval = setInterval(() => { setSeconds(seconds => seconds + 1) }, 1000);
        else if (!isRecording && seconds !== 0)
            clearInterval(interval);
        return () => clearInterval(interval);
    }, [isRecording, seconds, onRecord]);
    //
    async function getMessages() {
        await socket.emit('get_messages', user.room);
    }
    async function getUsers() {
        setOpen(true);
        await socket.emit('get_users', user.room);
    }
    async function onRecord() {
        if (!loading) {
            record();
            if (isRecording) {
                const blob = await recorder.stopRecording();
                setRecording(false);
                await socket.emit('send_message', { message: blob, user });
                setRecordings((rec) => [...rec, { message: URL.createObjectURL(blob), username: user.username }]);
            } else {
                try {
                    setLoading(true);
                    await recorder.initAudio();
                    await recorder.initWorker();
                    recorder.startRecording();
                    setRecording(true);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };
    async function record() {
        if (isRecording) {
            setSeconds(0);
            setRecording(false);
        } else setRecording(true);
    }
    //
    return (
        <Container style={{ paddingTop: '50px', width: '500px' }}>
            {recordings == null && (<ProgressBar />)}
            {recordings != null && (
                <Paper elevation={5} sx={{ borderStyle: 'solid', borderColor: 'Grey' }}>
                    <ChatUsers open={open} setOpen={setOpen} users={users} />
                    <Box p={2}>
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                <Typography variant='h6' gutterBottom>
                                    {'Room : ' + user.room}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={logout} variant="contained" >Log off</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button onClick={getUsers} variant="contained" >Users</Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                            <Grid item sx={{ height: '20rem' }} xs={12}>
                                <VoiceMessages recordings={recordings} />
                            </Grid>
                            <Grid item sx={{ paddingTop: '40px' }}>
                                <IconButton
                                    onClick={onRecord}
                                    aria-label='send'
                                    color={isRecording ? 'error' : 'primary'}
                                >
                                    <KeyboardVoiceIcon />
                                    {isRecording && (
                                        <Typography>
                                            {seconds}s
                                        </Typography>
                                    )}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            )}
        </Container >
    )
}

export default ChatComponent