import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const MySpinner=()=> {
  return (
    <Box sx={{ display: 'flex' ,justifyContent:'center'}}>
      <CircularProgress />
    </Box>
  );
}
