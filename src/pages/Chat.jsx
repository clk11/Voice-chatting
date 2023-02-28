import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import axios from 'axios'
import ProgressBar from '../components/ProgressBar'
import io from 'socket.io-client';
import TextField from '@mui/material/TextField';
import ChatComponent from '../components/ChatComponent';
const socket = io.connect("http://localhost:3001");
const config = {
  'Content-Type': 'application/json',
};

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const clear = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  useEffect(() => {
    return async () => {
      try {
        let result = await axios.get('http://localhost:3001/', config);
        if (result != null) {
          setUser(result.data.user)
          joinRoom(result.data.user)
        }
      } catch (err) {
        clear();
      }
    }
  }, [])
  useEffect(() => {
    return async () => {
      await socket.on('received_message', obj => {
        alert(obj.message);
      });
    };
  }, [socket])
  const joinRoom = async (obj) => {
    await socket.emit('join_room', obj);
  }
  const sendMessage = async () => {
    await socket.emit('send_message', { message, username: user.username, room: user.room });
  }
  const onClick = () => {
    clear();
  };
  return (
    <div>
      {user == null && (<ProgressBar />)}
      {user != null && (
        <ChatComponent user={user} logout = {onClick}/>
      )}
    </div>
  )
}

export default Chat