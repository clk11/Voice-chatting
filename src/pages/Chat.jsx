import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ProgressBar from '../components/ProgressBar'
import io from 'socket.io-client';
import ChatComponent from '../components/ChatComponent';
const socket = io.connect("/");
const config = {
  'Content-Type': 'application/json',
};

const Chat = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api', config);
        setUser(result.data.user);
        joinRoom(result.data.user);
      } catch (err) {
        clear();
      }
    };
    fetchData();
  }, []);
  function clear() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  const joinRoom = async (obj) => {
    await socket.emit('join_room', obj);
  }

  const handleLogout = async () => {
    await socket.emit('logout', user);
    clear();
  };
  return (
    <div>
      <div>
        {user === null ? <ProgressBar /> : <ChatComponent socket={socket} user={user} logout={handleLogout} />}
      </div>
    </div>
  )
}

export default Chat