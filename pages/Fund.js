import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Header from "../components/Header";
import supabase from "../src/Config/supaBaseClient";
import Styles from "../styles/fund.module.css"

const Fund = () => {
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
    if(inputValues.from == "" || inputValues.to == "" || inputValues.message == "" || inputValues.amount == ""){
        setErrorMsg("Please Fill All Feilds")
        setTimeout(() => {
            setErrorMsg("")
        }, 4000)
        return
    }

    inputValues.date = new Date().toLocaleString();

    const data = await supabase.rpc(
      "update_wallet_balance_and_transaction_details",
      {
        amount: inputValues.amount,
        details: JSON.stringify(inputValues),
      }
    );
    console.log(data);
  };

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
        <Button onClick={submitHandler} variant={"contained"}>Add Money</Button>
        <Typography className={Styles.errorMsg}>{errorMsg}</Typography>
      </Box>
    </Box>
  );
};

export default Fund;
