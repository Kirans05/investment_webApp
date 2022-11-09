import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const signup = () => {
    const [inputValues, setInputValues] = useState({
        phoneNumber:"",
        password:"",
        email:""
    })


    const inputChangeHandler = (e) => {
        setInputValues({...inputValues, [e.target.name] : e.target.value})
    }

  return (
    <Box>
      <TextField id="outlined-basic" label="Phone Number" variant="outlined"  onChange={inputChangeHandler} name="phoneNumber" value={inputValues.phoneNumber}/>
      <TextField id="outlined-basic" label="Password" variant="outlined"  onChange={inputChangeHandler} name="password" value={inputValues.password} />
      <TextField id="outlined-basic" label="Password" variant="outlined"  onChange={inputChangeHandler} name="email" value={inputValues.email} />
      <Button variant="contained">Signup</Button>
    </Box>
  );
}

export default signup
