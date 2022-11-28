import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuiAlert from "@mui/material/Alert";
import Styles from "../styles/withdraw.module.css";
import supabase from "../src/Config/supaBaseClient";

const Withdraw = () => {
  const router = useRouter();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [userDetails, setUserDetails] = useState("");
  const [inputValues, setInputValues] = useState({
    type: "debit",
    from: "null",
    to: "null",
    message: "withdraw",
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
    if (e.target.value <= 0) {
      return;
    }
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const backButtonHandler = () => {
    router.back();
  };

  const submitHandler = async () => {
    try {
      let supabaseResponse = await supabase.rpc("decrement_balance", {
        amount: inputValues.amount,
      });
      if (supabaseResponse.data == true) {
        try {
          let transactionResponse = await supabase.rpc(
            "update_transaction_details",
            {
              amount: inputValues.amount,
              sender: inputValues.from,
              receiver: inputValues.to,
              message: inputValues.message,
              id: userDetails.id,
              type: "debit",
            }
          );

          if (transactionResponse.data == true) {
            setSnackBarOpen(true);
            setSnackBarMsg("Successfully money withdrawed");
            setSnackBarColor("success");
          } else {
            setSnackBarOpen(true);
            setSnackBarMsg("unable to complete Transaction");
            setSnackBarColor("warning");
          }

          setTimeout(() => {
            router.push("Dashboard")
          }, 3000)
        } catch (err) {}
      }
    } catch (err) {}
  };

  useEffect(() => {
    let { user } = JSON.parse(
      localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token")
    );
    setUserDetails(user);
  }, []);

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Button
        variant="contained"
        className={Styles.backButton}
        onClick={backButtonHandler}
      >
        <ArrowBackIcon /> &nbsp; Back
      </Button>
      <Box className={Styles.withdrawPageBox}>
        <TextField
          id="outlined-basic"
          label="amount"
          variant="outlined"
          name="amount"
          type={"number"}
          onChange={changeHandler}
          value={inputValues.amount}
        />
        <Button onClick={submitHandler} variant={"contained"}>
          WithDraw
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

export default Withdraw;
