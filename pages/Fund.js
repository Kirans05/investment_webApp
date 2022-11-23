import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import supabase from "../src/Config/supaBaseClient";
import Styles from "../styles/fund.module.css";

const Fund = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [inputValues, setInputValues] = useState({
    type: "credit",
    from: "",
    to: "",
    message: "",
    amount: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

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
          if(resp.status == 200){
            alert("Successfully added balance")
          }else{
            alert("Internal Server Problem")
          }
        } catch (err) {}
      }
    } catch (err) {}
  };

  useEffect(() => {
    let { user } = JSON.parse(
      localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token")
    );
    setUserId(user.id);
  }, []);

  return (
    <Box className={Styles.mainBox}>
      <Header />
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
        <TextField
          id="outlined-basic"
          label="to"
          variant="outlined"
          name="to"
          value={inputValues.to}
          onChange={changeHandler}
        />
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
    </Box>
  );
};

export default Fund;
