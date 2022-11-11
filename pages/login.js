import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Styles from "../styles/Login.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const login = () => {

  const session = useSession()
  console.log("login session", session)
  const supabase = useSupabaseClient()


  const [inputValues, setInputValues] = useState({
    phoneNumber: "",
    password: "",
    email:""
  });

  const [password, setPassword] = useState(true);

  const inputChangeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };


  const submitHandler = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputValues.email,
      password: inputValues.password,
    })


    console.log("data-37", data)
    console.log("error-38", error)
    console.log("session-39", session)
  }


  const signOut = async () => {
    const res = await supabase.auth.signOut()
    console.log("res", res)
  }

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
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          onChange={inputChangeHandler}
          name="email"
          value={inputValues.email}
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
        <Button variant="contained" onClick={submitHandler}>Login</Button>
        <Button variant="contained" onClick={signOut}>signout</Button>
      </Box>
    </Box>
  );
};

export default login;









// W2Z0d8fhX4BnATHH 
