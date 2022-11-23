import supabase from "../src/Config/supaBaseClient";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Styles from "../styles/dashboard.module.css";
import axios from "axios"


const Dashboard = () => {
  const router = useRouter();
  const signOut = async () => {
    const res = await supabase.auth.signOut();
    router.push("/");
  };
  const [userDetails, setUserDetails] = useState("")
  const [kycVerified, setKycVerified] = useState(false)


  const fetchUserDetails = async (user) => {
    let response = await supabase
        .from("profiles")
        .select("*")
        .eq("id",user.id)
        .single()
    
      let {data} = response
      localStorage.setItem("userData",JSON.stringify(data))
      setUserDetails(data)
  }

  const kycVerification = async (userId) => {
    let getDetails = {
      url:"https://637cac1f16c1b892ebbb6fe6.mockapi.io/userData",
      method:"GET"
    }
    let response = await axios(getDetails)
    let {data} = response
    let filterItem = data.filter(item => item.userKycId == userId)
    if(filterItem.length == 0){
      let postDetails = {
        url:"https://637cac1f16c1b892ebbb6fe6.mockapi.io/userData",
        method:"POST",
        data:{
          userKycId:userId
        }
      }
      let postResponse = await axios(postDetails)
      if(postResponse.statusText == "Created"){
        setKycVerified(true)
      }else{
        setKycVerified(false)
      }
    }else{
      setKycVerified(true)
    }
  }



  useEffect(() => {
    const {user} = JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
    kycVerification(user.id)
    fetchUserDetails(user)
  },[])

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box className={Styles.dashboardMainBox}>
        <Typography>welcome to dashboard</Typography>
        <Typography sx={{display:kycVerified == false ? "block" : "none"}}>Kyc Not Verified</Typography>
        <Typography>Wallet Balance - {userDetails == "" ? 0 : userDetails.wallet_balance}</Typography>
        <Button variant="contained" onClick={signOut}>
          signout
        </Button>
        <Button variant="contained" onClick={() => router.push("Fund")}>
          Add Fund
        </Button>
        <Button variant="contained" onClick={() => router.push("Transactions")}>
          Transactions
        </Button>
        <Button variant="contained" onClick={() => router.push("Coins")}>
          Show Assets
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


// // declare
// //   balance int;
// // begin
//   select wallet_balance
//   into balance
//   from public.profiles
//   where id = auth.uid();

// //   balance = balance + amount;

//   update public.profiles
//   set wallet_balance = balance
//   where id = auth.uid();

  // insert into public.profiles(id,amount,sender,receiver,date,message,type)
  // values(id,amount,sender,receiver,date,message,type);

//   return balance;

// end;