import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const login = () => {

    const [inputValues, setInputValues] = useState({
        phoneNumber:"",
        password:""
    })


    const inputChangeHandler = (e) => {
        setInputValues({...inputValues, [e.target.name] : e.target.value})
    }

  return (
    <Box>
      <TextField id="outlined-basic" label="Phone Number" variant="outlined"  onChange={inputChangeHandler} name="phoneNumber" value={inputValues.phoneNumber}/>
      <TextField id="outlined-basic" label="Password" variant="outlined"  onChange={inputChangeHandler} name="password" value={inputValues.password} />
      <Button variant="contained">Login</Button>
    </Box>
  );
};

export default login;
