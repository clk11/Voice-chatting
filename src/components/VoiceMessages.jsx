import React from "react";
import { useState } from "react";
import vmsg from "vmsg";
import { List, ListItem } from '@mui/material'

const recorder = new vmsg.Recorder({
  wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});

const VoiceMessages = ({ Rec }) => {
  const [isLoading, setLoading] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const record = async () => {
    Rec();
    setLoading(true);
    if (isRecording) {
      const blob = await recorder.stopRecording();
      setLoading(false); setRecording(false);
      setRecordings(recordings.concat(URL.createObjectURL(blob)));
    } else {
      try {
        Rec();
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        setLoading(false); setRecording(true);
      } catch (e) {
        console.error(e);
        setLoading(false)
      }
    }
  };
  return (
    <>
      <button disabled={isLoading} onClick={record}>
        {isRecording ? "Stop" : "Record"}
      </button>
      <List sx={{  height: '20rem', overflow: 'auto' }}>
        {recordings.map(url => (
          <ListItem divider>
            <audio style={{width:'400px'}} src={url} controls />
          </ListItem>
        ))}
      </List>
    </>
  );
}
export default VoiceMessages;