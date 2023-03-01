import React from "react";
import { List, ListItem } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const VoiceMessages = ({ recordings }) => { 
  function formatName(str) {
    if (str.length > 10)
      return str.slice(0, 10) + '...';
    return str;
  }
  return (
    <>
      <List sx={{ height: '20rem', overflow: 'auto' }}>
        {recordings.map(({ url, user }) => (
          <ListItem key={url} divider>
            <Chip onClick={() => { alert(user.username) }} avatar={<Avatar />} label={formatName(user.username)} />
            <audio style={{ paddingLeft: '6px', width: '400px' }} src={url} controls />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default VoiceMessages