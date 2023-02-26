import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useStateContext } from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function LoginSwitch() {
   const{loggedin,setLoggedin}= useStateContext();
   const navigate=useNavigate();

  const handleChange = () => {
    setLoggedin(prev=>!prev)
    navigate('/')

  };

  return (
    <Stack direction="row">
    <Switch
      checked={loggedin}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    {loggedin?<Typography variant='h5'>log out</Typography>:<Typography>log in</Typography>}
    </Stack>
  );
}