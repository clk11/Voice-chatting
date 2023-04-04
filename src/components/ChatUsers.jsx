import React from 'react'
import {useEffect} from 'react'
import { Typography, Modal, List, ListItem, Grid, Box } from '@mui/material';
import Chip from '@mui/material/Chip';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    overflow: 'auto',
    height: 250,
    p: 5,
};
const ChatUsers = ({ users, open, setOpen }) => {
    useEffect(()=>{console.log(users)},[])
    function formatName(str) {
        if (str.length > 10)
            return str.slice(0, 10) + '...';
        return str;
    }
    return (
        <>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Chat users
                    </Typography>
                    <List sx={{ height: '20rem', overflow: 'auto' }}>
                        {users.map(({ username, status }) => (
                            <ListItem key={username} divider>
                                <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                        <Chip onClick={() => { alert(username) }} label={formatName(username)} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        {status == 'on' && (
                                            <Typography color={'#00e676'}>online</Typography>
                                        )}
                                        {status == 'off' && (
                                            <Typography color={'red'}>offline</Typography>

                                        )}
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </>
    )
}

export default ChatUsers
