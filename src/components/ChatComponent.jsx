import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Container, Button, IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useState, useEffect } from 'react';
import VoiceMessages from './VoiceMessages';
import vmsg from "vmsg";
const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});
const ChatComponent = ({ logout, user, socket }) => {
    const [isRecording, setRecording] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [recordings, setRecordings] = useState([]);

    const sendMessage = async (blob) => {
        await socket.emit('send_message', { url:blob, user });
    }
    useEffect(() => {
        return async () => {
            socket.on('received_message', obj => {
                // setRecordings((rec) => [...rec, obj]);
                // console.log(obj);
            });
        };
    }, [socket])
    const onRecord = async () => {
        setLoading(true);
        record();
        if (isRecording) {
            setLoading(false);
            const blob = await recorder.stopRecording();
            setRecording(false);
            sendMessage(blob);
        } else {
            try {
                await recorder.initAudio();
                await recorder.initWorker();
                recorder.startRecording();
                setLoading(false);
                setRecording(true);
            } catch (e) {
                console.error(e);
                setLoading(false)
            }
        }
    };
    useEffect(() => {
        let interval = null;
        if (isRecording) {
            interval = setInterval(() => { setSeconds(seconds => seconds + 1) }, 1000);
        } else if (!isRecording && seconds !== 0)
            clearInterval(interval);
        return () => clearInterval(interval);
    }, [isRecording, seconds]);
    const record = () => {
        if (isRecording) {
            setSeconds(0);
            setRecording(false);
        } else setRecording(true);
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
                            <Button disabled={isLoading} onClick={logout} variant="contained" >Log off</Button>
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
        </Container >
    )
}

export default ChatComponent