import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import supabase from "../src/Config/supaBaseClient";
import Styles from "../styles/fund.module.css";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Fund = () => {
  const router = useRouter();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [userId, setUserId] = useState("");
  const [inputValues, setInputValues] = useState({
    type: "credit",
    from: "",
    to: "null",
    message: "",
    amount: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarColor, setSnackBarColor] = useState("success");

  const handleSnackBarClick = () => {
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const changeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (
      inputValues.from == "" ||
      inputValues.to == "" ||
      inputValues.message == "" ||
      inputValues.amount == ""
    ) {
      setErrorMsg("Please Fill All Feilds");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }
    try {
      let response = await supabase.rpc("update_wallet_balance", {
        amount: inputValues.amount,
      });
      if (response.data == true) {
        try {
          let resp = await supabase.rpc("update_transaction_details", {
            amount: inputValues.amount,
            sender: inputValues.from,
            receiver: inputValues.to,
            message: inputValues.message,
            id: userId,
            type: "credit",
          });
          if (resp.status == 200) {
            handleSnackBarClick();
            setSnackBarColor("success");
            setSnackBarMsg("Successfully added balance");
          } else {
            handleSnackBarClick();
            snackBarOpen(true);
            setSnackBarColor("error");
            setSnackBarMsg("Internal Server Problem");
          }
          setTimeout(() => {
            router.push("Dashboard")
          }, 3000)
        } catch (err) {}
      }
    } catch (err) {}
  };


  const backButtonHandler = () => {
    router.back()
  }

  useEffect(() => {
    let { user } = JSON.parse(
      localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token")
    );
    setUserId(user.id);
  }, []);

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Button variant="contained"className={Styles.backButton} onClick={backButtonHandler}><ArrowBackIcon /> &nbsp; Back</Button>
      <Box className={Styles.fundPageBox}>
        <TextField
          id="outlined-basic"
          label="amount"
          variant="outlined"
          name="amount"
          type={"number"}
          onChange={changeHandler}
        />
        <TextField
          id="outlined-basic"
          label="from"
          variant="outlined"
          name="from"
          value={inputValues.from}
          onChange={changeHandler}
        />
        {/* <TextField
          id="outlined-basic"
          label="to"
          variant="outlined"
          name="to"
          value={inputValues.to}
          onChange={changeHandler}
        /> */}
        <TextField
          id="outlined-basic"
          label="message"
          variant="outlined"
          name="message"
          value={inputValues.message}
          onChange={changeHandler}
        />
        <Button onClick={submitHandler} variant={"contained"}>
          Add Money
        </Button>
        <Typography className={Styles.errorMsg}>{errorMsg}</Typography>
      </Box>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={snackBarColor}
          sx={{ width: "100%" }}
        >
          {snackBarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Fund;
