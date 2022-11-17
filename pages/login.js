import supabase from "../src/Config/supaBaseClient";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Styles from "../styles/Login.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import Animation from "../src/Lotties/login-lottie.json.json";
import Typical from "react-typical";

const SplitText = (props) => {
  return (
    <span aria-label={props.copy} role={props.role} className={Styles.span1}>
      {props.copy.split("").map(function (char, index) {
        let style = { "animation-delay": 0.5 + index / 10 + "s" };
        return (
          <span
            className={Styles.span2}
            aria-hidden="true"
            key={index}
            style={style}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

const login = () => {
  const router = useRouter();
  // const supabase = useSupabaseClient();

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

    console.log("data", data);
    console.log("error", error);

    if (error) {
      setErrorMsg("Invalid login credentials");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }

    if (data.session) {
      router.push("Dashboard");
      // sb-rjbbcbogvcyfgacrosge-auth-token
    }
  };

  const singupPageNavigator = () => {
    router.push("signup");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box className={Styles.loginBox}>
        <Box className={Styles.lottieBox}>
          <Box>
            <Typography className={Styles.loginLottieTitle}>Login</Typography>
            <Typography className={Styles.signupOption}>
              if you don't have an acoount
            </Typography>
            <Typography className={Styles.signupOption}>
              you can{" "}
              <span
                className={Styles.signupButton}
                onClick={singupPageNavigator}
              >
                Register here !
              </span>
            </Typography>
          </Box>
          <Lottie options={defaultOptions} height={400} width={400} />
        </Box>
        <Box className={Styles.loginForm}>
          <Typography className={Styles.loginTitleAnimation}>
            <SplitText copy="Login" role="heading" />
          </Typography>

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
          <Box className={Styles.smallScreenSignupButton}>
            <Typography className={Styles.signupOption}>
              if you don't have an acoount
            </Typography>
            <Typography className={Styles.signupOption}>
              you can{" "}
              <span
                className={Styles.signupButton}
                onClick={singupPageNavigator}
              >
                Register here !
              </span>
            </Typography>
          </Box>
          <Typography className={Styles.errorMsg}>{errorMsg}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default login;

// W2Z0d8fhX4BnATHH
