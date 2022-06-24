import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Loading from './Loading';

const Input = styled('input')({
  display: 'none',
});




function App() {
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [transcription, setTranscription] = useState('')
  const axios = require('axios');

  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "935d974879134d49b21a0bca7fd81bd8",
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
  });

  const onChange = (e) => {
    if (!e.target.files[0]) return
    setFile(e.target.files[0].name)
    setLoading(true)

    console.log('file: ', e.target.files[0])
  }



  return (
    <div className="App">
      <div>{file}</div>
      <label htmlFor="contained-button-file">
        <Input accept="audio/*,video/*" id="contained-button-file" multiple type="file" onChange={onChange}/>
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      {loading ? <div>Your file is being transcribed...</div> : <div>Upload a file to transcribe!</div>}
      {loading ? <Loading/> : null}
    </div>
  );
}

export default App;
