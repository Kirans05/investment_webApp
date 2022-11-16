import supabase from "../src/Config/supaBaseClient";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Styles from "../styles/dashboard.module.css";

const Dashboard = ({ session }) => {
  const router = useRouter();
  const user = useUser();

  const [inputValues, setInputValues] = useState(0);
  const [ivalue, setIValue] = useState({
    type: "",
    from: "",
    to: "",
    message: "",
  });

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    router.push("/");
  };

  const change = (e) => {
    setIValue({ ...ivalue, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    const datas = await supabase
      .from("profiles")
      .update([{ wallet_balance: inputValues }])
      .eq("id", "77cba4e6-44e0-4965-bfb8-90fe4de716b7");

    console.log("data", datas);

    const transValue = await supabase
      .from("profiles")
      .select("transaction_details")
      .eq("id", "77cba4e6-44e0-4965-bfb8-90fe4de716b7");
    let arrayData = transValue.data[0].transaction_details;
    if (arrayData == null) {
      arrayData = [];
    }
    ivalue.amount = inputValues;
    arrayData.push(ivalue);

    const data = await supabase
      .from("profiles")
      .update([{ transaction_details: arrayData }])
      .eq("id", "77cba4e6-44e0-4965-bfb8-90fe4de716b7");
    console.log(data);
  };

  const rpcHandler = async () => {
    // let data = await supabase.rpc("get_planets")
    // console.log(data)
    // let data = await supabase.rpc("upadte_datas", {inputValues, {kiran:"kiran"}})
    // let trans_details = {}

    //   let data = await supabase
    // .rpc('obj')
    //   console.log(data)
    // }
    // let data = await supabase.rpc("obj");
    // console.log(data);
    //   let data = await supabase
    // .rpc('data_update', {
    //   amount:inputValues
    // })
    //   console.log(data)
    // }

    let arr = [
      {
        "name":"kiran"
      },
      {
        "name":"manoj"
      }
    ]
    // console.log(JSON.stringify(arr))
  //   const data = await supabase
  // .from('profiles')
  // // .update({ transaction_details: JSON.stringify(val) })
  // .update({ wallet_balance: 199 })
  // .eq('id', '77cba4e6-44e0-4965-bfb8-90fe4de716b7')

  // console.log(data)
  // const datas = await supabase
  //     .from("profiles")
  //     .update([{ transaction_details: JSON.stringify(arr) }])
  //     .eq("id", "75e7edac-bd14-4fd7-97f3-962b6369a63c");

  // console.log(datas)

  let data = await supabase.rpc("updates_data",{
    details:JSON.stringify(arr)
  })

  console.log(data)
     
  // let data = await supabase
  //     .from("profiles")
  //     .select()
  //     .eq("id","75e7edac-bd14-4fd7-97f3-962b6369a63c")
  //     console.log(data)


  // console.log(val)
  // console.log(JSON.stringify(val))


  };

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box className={Styles.dashboardMainBox}>
        <Typography>welcome to dashboard</Typography>
        <Button variant="contained" onClick={signOut}>
          signout
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          <TextField
            id="outlined-basic"
            label="amount"
            variant="outlined"
            name="amount"
            type={"number"}
            onChange={(e) => setInputValues(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="currency"
            variant="outlined"
            name="currency"
          />
          <TextField
            id="outlined-basic"
            label="from"
            variant="outlined"
            name="from"
            value={ivalue.from}
            onChange={change}
          />
          <TextField
            id="outlined-basic"
            label="to"
            variant="outlined"
            name="to"
            value={ivalue.to}
            onChange={change}
          />
          <TextField
            id="outlined-basic"
            label="message"
            variant="outlined"
            name="message"
            value={ivalue.message}
            onChange={change}
          />
          <TextField
            id="outlined-basic"
            label="type"
            variant="outlined"
            name="type"
            value={ivalue.type}
            onChange={change}
          />
          <Button onClick={submitHandler}>submit</Button>
          <Button onClick={rpcHandler}>rpc handler</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

// declare
//   balance int;
// begin
//   select wallet_balance
//   into balance
//   from public.profiles
//   where id = auth.uid();

//   balance = balance + data_update.amount;

//   update public.profiles
//   set wallet_balance = balance
//   where id = auth.uid();

//   return balance;

// end;

// declare
//   balance int;
//   obj json;
// begin
//   select wallet_balance, transaction_details
//   into balance, obj
//   from public.profiles
//   where id = auth.uid();

//   balance = balance + upadte_datas.amount;

//   update public.profiles
//   set wallet_balance = balance
//   where id = auth.uid();

//   return balance;

// end;
