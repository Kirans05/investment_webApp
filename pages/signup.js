import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Styles from "../styles/signup.module.css";
import Header from "../components/Header"
// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import supabase from "../src/Config/supaBaseClient"


const signup = () => {

  // const supabase = useSupabaseClient()
  // console.log(supabase)


  const [inputValues, setInputValues] = useState({
    phoneNumber: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    confirmpassword: "",
  });

  const [password, setPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("")

  const inputChangeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };


  const submitHandler = async () => {

    if(inputValues.phoneNumber == "" || inputValues.password == "" || inputValues.confirmpassword == "" || inputValues.email == "" || inputValues.firstName == "" || inputValues.lastName == ""){
      setErrorMsg("Please Fill All The Feilds")
      return
    }

    if(inputValues.password != inputValues.confirmpassword){
      setErrorMsg("Password Doesn't match")
      return
    }

    const {data, error} = await supabase
            .auth
            .signUp(
              {firstName:inputValues.firstName, lastName : inputValues.lastName, phoneNUmber:inputValues.phoneNumber, password : inputValues.password}
              )
        // .from("users")
        // .insert([
        //   {firstName:inputValues.firstName, lastName : inputValues.lastName, phoneNUmber:inputValues.phoneNumber, password : inputValues.password}
        // ])
        // .select()

    console.log("data", data)
    console.log("error", error)

    if(error){
      console.log("e",error)
    }

    if(data){
      console.log("d",data)
    }

  }

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box className={Styles.sigupForm}>
        <TextField
          className={Styles.firstName}
          id="outlined-basic"
          label="FirstName"
          variant="outlined"
          onChange={inputChangeHandler}
          name="firstName"
          value={inputValues.firstName}
        />
        <TextField
          id="outlined-basic"
          label="LastName"
          variant="outlined"
          onChange={inputChangeHandler}
          name="lastName"
          value={inputValues.lastName}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={inputChangeHandler}
          name="email"
          value={inputValues.email}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          onChange={inputChangeHandler}
          name="phoneNumber"
          value={inputValues.phoneNumber}
          type={"number"}
        />
        <Box className={Styles.sigupForm_passwordTage}>
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
        <Box className={Styles.sigupForm_confirmPasswordTage}>
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            onChange={inputChangeHandler}
            name="confirmpassword"
            value={inputValues.confirmpassword}
            type={confirmPassword ? "password" : "text"}
          />
          <Box onClick={() => setConfirmPassword(!confirmPassword)} sx={{"&:hover":{cursor:"pointer"}}}>
            {confirmPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </Box>
        </Box>
        <Button variant="contained" onClick={submitHandler}>Signup</Button>
        <Typography>{errorMsg}</Typography>
      </Box>
    </Box>
  );
};

export default signup;
