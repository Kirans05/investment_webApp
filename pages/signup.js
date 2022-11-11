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
import Header from "../components/Header";
import supabase from "../src/Config/supaBaseClient";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const signup = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

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
  const [errorMsg, setErrorMsg] = useState("");

  const inputChangeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (
      inputValues.phoneNumber == "" ||
      inputValues.email == "" ||
      inputValues.password == "" ||
      inputValues.confirmpassword == "" ||
      inputValues.firstName == "" ||
      inputValues.lastName == ""
    ) {
      setErrorMsg("Please Fill All The Feilds");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }

    if (inputValues.password != inputValues.confirmpassword) {
      setErrorMsg("Passwors Does not Match");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: inputValues.email,
      password: inputValues.password,
    });

    if (error) {
      setErrorMsg("Password should be atleast 6 characters");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }

    if (data.session == null) {
      setErrorMsg("Please Check your Email for Confimation link");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }
  };

  const loginPageNavigator = () => {
    router.push("login");
  };

  return (
    <Box className={Styles.mainBox}>
      <Box className={Styles.sigupForm}>
        <Typography className={Styles.signupTitle}>Sign Up</Typography>
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
            className={Styles.passwordTage}
          />
          <Box
            onClick={() => setPassword(!password)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
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
            className={Styles.passwordTage}
          />
          <Box
            onClick={() => setConfirmPassword(!confirmPassword)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            {confirmPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </Box>
        </Box>
        <Button variant="contained" onClick={submitHandler}>
          Signup
        </Button>
        <Typography className={Styles.loginLink}>
          Already have an acoount{" "}
          <span className={Styles.loginSpan} onClick={loginPageNavigator}>
            Login
          </span>
        </Typography>
        <Typography className={Styles.errorMsg}>{errorMsg}</Typography>
      </Box>
    </Box>
  );
};

export default signup;
