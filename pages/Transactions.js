import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TransactionCard from '../components/TransactionCard/TransactionCard'
import supabase from '../src/Config/supaBaseClient'
import Styles from "../styles/Transaction.module.css"

const Transactions = () => {

    const [transactionData, setTransactionData] = useState([])

    const fetchTransactionData = async () => {
        let {user} = JSON.parse(localStorage.getItem("sb-rjbbcbogvcyfgacrosge-auth-token"))

        let response = await supabase
                .from("profiles")
                .select("transaction_details")
                .eq("id", user.id)
                .single()
        
        let {data, error} = response
        if(error){
            alert("Internal Server Problem")
            return
        }

        if(data){
            setTransactionData(data.transaction_details)
        }
        console.log(data)
    }


    useEffect(() =>{
        fetchTransactionData()
    },[])

    

  return (
    <Box>
        <Header />
        <Box>
            

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell  align="center">From</TableCell>
            <TableCell align="center" >To</TableCell>
            <TableCell align="center" >Amount</TableCell>
            <TableCell align="center" >Message</TableCell>
            <TableCell align="center" >Date</TableCell>
            <TableCell align="center" >Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
                transactionData.map((item, index) => {
                    return <TransactionCard key={index} item={item} Styles={Styles}/>
                })
            }
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    </Box>
  )
}

export default Transactions