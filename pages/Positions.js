import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PositionsCard from '../components/PositionsCard/PositionsCard'
import Styles from "../styles/Positions.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import supabase from '../src/Config/supaBaseClient'


const Positions = () => {

    const router = useRouter()
    const [positionsArr, setPositionsArr] = useState([])
    const backButtonHandler = () => {
        console.log(router)
        // router.back()
    }


    const fetchPositions = async (userId) => {
        try{
            let response = await supabase
                .from("coins_table")
                .select("*")
                .eq("id",userId)
            
            let {data} = response
            setPositionsArr(data)
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
      <Table  size="large" aria-label="a dense table" className={Styles.PositionsTable}>
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
              return <PositionsCard key={index} item={item} index={index}/>
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Box>    
  )
}

export default Positions