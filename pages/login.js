import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Styles from "../styles/Login.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [inputValues, setInputValues] = useState({
    password: "",
    email: "",
  });

  const [password, setPassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const inputChangeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (inputValues.password == "" || inputValues.email == "") {
      setErrorMsg("Please Fill All The Fields");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputValues.email,
      password: inputValues.password,
    });

    if (error) {
      setErrorMsg("Invalid login credentials");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }

    if (data.session) {
      router.push("/");
    }
  };


  const singupPageNavigator = () => {
    router.push("signup")
  }

  return (
    <Box className={Styles.mainBox}>
      <Box className={Styles.loginForm}>
        <Typography className={Styles.loginTitle}>Login</Typography>
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
            className={Styles.passwordTag}
          />
          <Box
            onClick={() => setPassword(!password)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            {password ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </Box>
        </Box>
        <Button variant="contained" onClick={submitHandler}>
          Login
        </Button>
        <Typography className={Styles.signupLink}>
          Don't have an account? <span className={Styles.signupSpan}
          onClick={singupPageNavigator}
          >Sign up</span>
        </Typography>
        <Typography className={Styles.errorMsg}>{errorMsg}</Typography>
      </Box>
    </Box>
  );
};

export default login;

// W2Z0d8fhX4BnATHH
