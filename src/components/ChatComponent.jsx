import * as React from 'react';
import { Typography, Paper, Container, Button, IconButton, Grid, Box } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useState, useEffect } from 'react';
import VoiceMessages from './VoiceMessages';
import ProgressBar from './ProgressBar'
import ChatUsers from './ChatUsers';

const ChatComponent = ({ logout, user, socket }) => {
    //Modal
    const [open, setOpen] = useState(false);
    //
    const [recording, setRecording] = useState(false);
    const [rec, setRec] = useState(null);
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
        const handleReceivedMessage = obj => {
            obj.message = URL.createObjectURL(new Blob([obj.message], { type: "audio/webm" }));
            setRecordings(rec => [...rec, { message: obj.message, username: obj.user.username }]);
        };
        const handleGettingUsers = obj => {
            setUsers(obj);
        };
        const handleGettingMessages = obj => {
            if (obj == null) {
                setRecordings([]);
            } else {
                obj.forEach(item => {
                    item.message = URL.createObjectURL(new Blob([item.message], { type: "audio/webm" }));
                });
                setRecordings(obj);
            }
        };

        socket.on('received_message', handleReceivedMessage);
        socket.on('getting_users', handleGettingUsers);
        socket.on('getting_messages', handleGettingMessages);

        return () => {
            socket.off('received_message', handleReceivedMessage);
            socket.off('getting_users', handleGettingUsers);
            socket.off('getting_messages', handleGettingMessages);
        };
    }, [socket]);
    useEffect(() => {
        if (seconds == 1) setLoading(false);
        let interval = null;
        if (recording)
            interval = setInterval(() => { setSeconds(seconds => seconds + 1) }, 1000);
        else if (!recording && seconds !== 0)
            clearInterval(interval);
        return () => clearInterval(interval);
    }, [recording, seconds, onRecord]);
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
            if (!recording) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                const audioChunks = [];
                recorder.addEventListener("dataavailable", (event) => {
                    audioChunks.push(event.data);
                });
                recorder.addEventListener("stop", async () => {
                    const audioBlob = new Blob(audioChunks);
                    await socket.emit('send_message', { message: audioBlob, user });
                    setRecordings((rec) => [...rec, { message: URL.createObjectURL(audioBlob), username: user.username }]);
                });
                recorder.start();
                setRec(recorder);
                setRecording(true);
            } else {
                setRecording(false);
                rec.stop();
            }
        }
    };
    async function record() {
        if (recording) {
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
                                <Button onClick={logout} variant="contained" >Logoff</Button>
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
            )}
        </Container >
    )
}

export default ChatComponent
