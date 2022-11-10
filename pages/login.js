import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Styles from "../styles/Login.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const login = () => {
  const [inputValues, setInputValues] = useState({
    phoneNumber: "",
    password: "",
  });

  const [password, setPassword] = useState(true);

  const inputChangeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box className={Styles.loginForm}>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          onChange={inputChangeHandler}
          name="phoneNumber"
          value={inputValues.phoneNumber}
        />
        <Box className={Styles.passwordTage}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={inputChangeHandler}
            name="password"
            value={inputValues.password}
            type={password ? "password" : "text"}
          />
          <Box onClick={() => setPassword(!password)} sx={{"&:hover":{cursor:"pointer"}}}>
            {password ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </Box>
        </Box>
        <Button variant="contained">Login</Button>
      </Box>
    </Box>
  );
};

export default login;









// W2Z0d8fhX4BnATHH 
