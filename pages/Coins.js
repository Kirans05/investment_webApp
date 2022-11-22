import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CoinCard from "../components/CoinCard/CoinCard"
import Styles from "../styles/coin.module.css"

const Coins = () => {

    const [coinData, setCoinData] = useState([])

    const fetchCryptoCoins = async () => {
        let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=7",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        let data = await response.json()
        console.log(data)
        setCoinData(data)
    }


    useEffect(() => {
        fetchCryptoCoins()
    },[])

  return (
    <Box>
        <Typography>Coins</Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='center' >Sl.No</TableCell>
            <TableCell align="center" >Coin</TableCell>
            <TableCell align="center" >Price</TableCell>
            <TableCell align="center" >Market Cap</TableCell>
            <TableCell align="center" >Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            coinData.map((item, index) => {
                return <CoinCard key={index} item={item} index={index} Styles={Styles}/>
            })
        }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

export default Coins