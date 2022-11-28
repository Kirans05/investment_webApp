import supabase from "../src/Config/supaBaseClient";
import {
  Alert,
  Box,
  Button,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Styles from "../styles/dashboard.module.css";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState("");
  const [rerender, setRerender] = useState(true);

  const fetchUserDetails = async (user) => {
    let response = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    let { data } = response;
    localStorage.setItem("userData", JSON.stringify(data));
    setUserDetails(data);
  };

  const kycVerification = async () => {
    let getDetails = {
      url: "https://637cac1f16c1b892ebbb6fe6.mockapi.io/userData",
      method: "GET",
    };
    let response = await axios(getDetails);
    let { data } = response;
    let filterItem = data.filter((item) => item.userKycId == userDetails.id);
    if (filterItem.length == 0) {
      let postDetails = {
        url: "https://637cac1f16c1b892ebbb6fe6.mockapi.io/userData",
        method: "POST",
        data: {
          userKycId: userDetails.id,
        },
      };
      let postResponse = await axios(postDetails);
      if (postResponse.statusText == "Created") {
        let supabaseResponse = await supabase
          .from("profiles")
          .update([{ kyc_verified: true }])
          .eq("id", userDetails.id);
        if (supabaseResponse.status == 204) {
          setRerender(!rerender);
        }
      }
    }
  };

  useEffect(() => {
    const { user } = JSON.parse(
      localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token")
    );
    fetchUserDetails(user);
  }, [rerender]);

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box className={Styles.dashboardMainBox}>
        {userDetails == "" ? null : (
          <Alert
            severity="warning"
            sx={{
              display: userDetails.kyc_verified == false ? "flex" : "none",
            }}
            onClick={kycVerification}
          >
            KYC not verified &nbsp;{" "}
            <span className={Styles.kycVerificationButton}>Verify Now!</span>
          </Alert>
        )}

        {userDetails == "" ? (
          <Skeleton
            variant="rectangular"
            width={400}
            height={120}
            style={{ borderRadius: "20px" }}
          />
        ) : (
          <Box className={Styles.wallet_balance}>
            <Typography>Your Portfolio</Typography>
            <Typography>$ {userDetails.wallet_balance}</Typography>
            <Button
                variant="contained"
                className={Styles.portfolioButton}
                onClick={() => router.push("Portfolio")}
              >
                View Portfolio
              </Button>
          </Box>
        )}
        {userDetails == "" ? (
          <Skeleton
            variant="rectangular"
            width={400}
            height={120}
            style={{ borderRadius: "20px" }}
          />
        ) : (
          <Box className={Styles.addFundBox}>
            <Box className={Styles.fundBox}>
              <Typography>Funds Available</Typography>
              <Typography>$ {userDetails.wallet_balance}</Typography>
            </Box>
            <Box className={Styles.fundBoxButtons}>
              <Button
                variant="contained"
                className={Styles.fundBoxButton}
                onClick={() => router.push("Fund")}
              >
                Add Funds
              </Button>
              <Button
                variant="contained"
                className={Styles.fundBoxButton}
                onClick={() => router.push("Withdraw")}
              >
                withdraw
              </Button>
            </Box>
          </Box>
        )}
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
