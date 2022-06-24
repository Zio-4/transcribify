import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import React from 'react'

function Loading() {
  return (
     <Box sx={{ display: 'flex', alignContent:'center', justifyContent:'center', marginTop: '4rem'}}>
      <CircularProgress size='5rem' />
    </Box>

  )
}

export default Loading
