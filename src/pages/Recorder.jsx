import React, { useEffect } from 'react'
import { useContext } from 'react'
import AppContext from '../contexts/AppContext'
import { Button } from '@mui/material'
import axios from 'axios'
const Recorder = () => {
  const { username } = useContext(AppContext);
  const onClick = ()=>{
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <div>Welcome to recorder {username}</div>
      <Button onClick={onClick}>Log off</Button>
    </>
  )
}

export default Recorder