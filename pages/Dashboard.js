import supabase from "../src/Config/supaBaseClient";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const router = useRouter();
  const signOut = async () => {
    const res = await supabase.auth.signOut();
    router.push("/");
  };

  const kycVerification = async () => {
    let {user} = JSON.parse(localStorage.getItem("sb-rjbbcbogvcyfgacrosge-auth-token")) 
    const data = await supabase
      .from("profiles")
      .update({ kyc: true })
      .eq("id", user.id);
      console.log(data)
  };

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box className={Styles.dashboardMainBox}>
        <Typography>welcome to dashboard</Typography>
        <Button variant="contained" onClick={kycVerification}>
          KYC Verification
        </Button>
        <Button variant="contained" onClick={signOut}>
          signout
        </Button>
        <Button variant="contained" onClick={() => router.push("Fund")}>
          Add Fund
        </Button>
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
