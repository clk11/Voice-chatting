import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'
import axios from 'axios'
import ProgressBar from '../components/ProgressBar'
const config = {
  'Content-Type': 'application/json',
};

const Recorder = () => {
  const [user, setUser] = useState(null);
  const clear = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  useEffect(() => {
    return async () => {
      try{
        let result = await axios.get('http://localhost:3001/', config);
        if (result != null) 
        setUser(result.data.user)
      }catch(err){
        clear();
      }
    }
  }, [])
  const onClick = () => {
    clear();
  };
  return (
    <div>
      {user == null && (<ProgressBar />)}
      {user != null && (
        <div>
          <div>Welcome to recorder {user.username}</div>
          <div>Your room is "{user.room}"</div>
          <Button onClick={onClick}>Log off</Button>
        </div>
      )}
    </div>
  )
}

export default Recorder