import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Styles from "../styles/Portfolio.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import supabase from '../src/Config/supaBaseClient';
import PortfolioCard from '../components/PortfolioCard/PortfolioCard';
import { useRouter } from 'next/router';


const Portfolio = () => {

  const router = useRouter()
  const [positionsArr, setpositionsArr] = useState([])

  const backButtonHandler = () => {
    router.back()
  }

  const fetchPositions = async (userId) => {
    try{
      let positionsResponse = await supabase
          .from("coins_table")
          .select("*")
          .eq("id",userId)

      console.log(positionsResponse)
      setpositionsArr(positionsResponse.data)
    }catch(err){

    }
  }

  useEffect(() => {
    let {user} = JSON.parse(localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token"))
    fetchPositions(user.id)
  },[])

  return (
    <Box Box className={Styles.mainBox}>
    <Header />
    <Button variant="contained"className={Styles.backButton} onClick={backButtonHandler}><ArrowBackIcon /> &nbsp; Back</Button>
  <Box className={Styles.tableContainer}>
  <TableContainer >
  <Table  size="large" aria-label="a dense table" className={Styles.PortfolioTable}>
    <TableHead>
      <TableRow>
        <TableCell align="center">Sl.No</TableCell>
        <TableCell align="center">CoindId</TableCell>
        <TableCell align="center">Units</TableCell>
        <TableCell align="center">Price</TableCell>
        <TableCell align="center">Date</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        positionsArr.map((item, index) => {
          return <PortfolioCard key={index} item={item} index={index}/>
        })
      }
    </TableBody>
  </Table>
</TableContainer>
  </Box>
</Box> 
  )
}

export default Portfolio