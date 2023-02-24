import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { List, ListItem, Typography, Paper, FormControl, Divider, Container, Button, IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const Chat = ({Logout}) => {
    return (
        <Container style={{ paddingTop: '50px', width: '500px' }}>
            <Paper elevation={5} sx={{ borderStyle: 'solid', borderColor: 'Grey' }}>
                <Box p = {2}>
                    <Grid container spacing={6}>
                        <Grid item xs={8}>
                            <Typography variant='h4' gutterBottom>
                                {'Room11'}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick = {Logout} variant="contained" >Log off</Button>
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
                                aria-label='send'
                                color='primary'
                            >
                                <KeyboardVoiceIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default Chat