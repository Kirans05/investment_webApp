import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TransactionCard from '../components/TransactionCard/TransactionCard'
import supabase from '../src/Config/supaBaseClient'

const Transactions = () => {

  const [transactionData, setTransactionData] = useState([])

  const fetchAllTransactions = async (userId) => {
    try{
      let response = await supabase
      .from("transaction_table")
      .select("*")
      // .eq("id","077a96da-438b-49ba-8ea5-70a00cdad6f1")
      .eq("id",userId)
      setTransactionData(response.data)
    }catch(err){


    }
  }


  useEffect(() => {
    let {user} = JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
    fetchAllTransactions(user.id)
  },[])

  return (
    <Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sl.No</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">message</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            transactionData.map((item, index) => {
              return <TransactionCard key={index} item={item} index={index}/>
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

export default Transactions




{/* <h1 style="text-align: center;">Confirm your signup</h1>
<img src="https://www-cms.pipedriveassets.com/blog-assets/confirmation-email-templates.png" alt="image-email" width="50%" style="margin-left: 25%;">
<h3 style="text-align: center;">Please Verify this email address by click button below</h3>
<p style="text-align: center;"><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>  */}


// decrement_balance

// declare
//   balance int;
// begin
//   select wallet_balance
//   into balance
//   from public.profiles
//   where id = auth.uid();

//   balance = balance-amount;

//   update public.profiles
//   set wallet_balance = balance
//   where id = auth.uid();

//   return true;
// end;



// update_coins_table
// begin
//   insert into public.coins_table(id,coinid,price_purchased)
//   values(userId,coin_id,purchase_price);

//   return true;
// end;



// update_transaction_details

// begin
//   insert into public.transaction_table(id,amount,sender,receiver,message,type)
//   values(id,amount,sender,receiver,message,type);

//   return true;
// end;



// update_wallet_balance
// declare
//   balance int;
// begin
//   select wallet_balance
//   into balance
//   from public.profiles
//   where id = auth.uid();

//   balance = balance+amount;

//   update public.profiles
//   set wallet_balance = balance
//   where id = auth.uid();

//   return true;
// end;