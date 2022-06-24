import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Loading from './Loading';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const Input = styled('input')({
  display: 'none',
});


function App() {
  const [fieldValue, setFieldValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [transcription, setTranscription] = useState('')
  const axios = require('axios');

  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "935d974879134d49b21a0bca7fd81bd8",
        "content-type": "application/json",
    },
  });

  const onChange = (e) => {
    setFieldValue(e.target.value)
  }

  const handleClick = async () => {
    if (!fieldValue) return
    setLoading(true)
    setFieldValue('')
    const postResponse = await assembly.post("/transcript", { audio_url: fieldValue })

    // interval to check transcription processing status
    const interval = setInterval(async () => {
      const transcript = await assembly.get(`/transcript/${postResponse.data.id}`)
      const transcriptStatus = transcript.data.status
      console.log(`Transcript Status: ${transcriptStatus}`)
      
      if (transcriptStatus == 'error') {
        setLoading(false)
        clearInterval(interval)
        alert('An error occured. Try again. If error continues, check your file type to make sure it is compatible')
      } else if (transcriptStatus === "completed") {
        console.log('transcription: ', transcript.data.text)
        setLoading(false)
        setTranscription(transcript.data.text)
        clearInterval(interval)
      }
    }, 4000)
  }

 // https://bit.ly/3yxKEIY

  return (
    <Box sx={{ flexGrow: 1 }} className='app'>
      <Grid container maxWidth={{xs:'60%', md:'80%'}}>
        <Grid item xs={12}>
          <Typography  sx={{fontSize: {xs: '2em', md: '5em'}, textAlign: 'center', marginTop: '2rem'}}>Transcribify</Typography>
        </Grid>

        <Grid item xs={12} sx={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Paper sx={{padding: '1rem'}}>
            <Typography>How it works:</Typography>

          
            <ul> <Typography>1. Enter a URL in the text field below that routes to an audio or video file</Typography></ul>
            <ul><Typography>2. Click transcribe</Typography></ul>
            <ul><Typography>3. BOOM! You have your transcription</Typography></ul>
          </Paper>
        </Grid >

        <Grid item xs={12} sx={{textAlign: 'center', marginTop: '.5rem'}}>
          <Typography variant='caption'>Supported file formats: .3ga .aac .ac3 .aif .aiff .alac .amr .ape .au .dss .flac .flv .m4a .m4b .m4p .mp3 .mpga .ogg, .oga, .mogg .opus .qcp .tta .voc .wav .wma .wv .webm .MTS, .M2TS, .TS .mov .mp4, .m4p (with DRM), .m4v .mxf</Typography>
        </Grid>

        <Grid item xs={12} sx={{textAlign: 'center', marginY: '1.5rem'}}>
          <TextField variant="outlined" onChange={onChange} value={fieldValue} size='small' sx={{marginRight: '.5rem'}}/>
          <Button variant="contained" component="span" onClick={handleClick}>
            Transcribe
          </Button>
        </Grid>
        
        <Grid item xs={12} sx={{textAlign: 'center'}} >
          {transcription ? <Typography  >Your transcription:</Typography> : null}
          {loading ? <Typography>Your file is being transcribed...</Typography> : null}
          {loading ? <Loading/> : null}
          <Paper elevation={2} sx={{marginTop: '1.5 rem',}}><Typography>{transcription}</Typography></Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

export default App;
