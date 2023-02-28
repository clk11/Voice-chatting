import React from "react";
import { List, ListItem } from '@mui/material'

const VoiceMessages = ({recordings}) => {
  return (
    <>
      <List sx={{ height: '20rem', overflow: 'auto' }}>
        {recordings.map(url => (
          <ListItem key={url} divider>
            <audio style={{ width: '400px' }} src={url} controls />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default VoiceMessages