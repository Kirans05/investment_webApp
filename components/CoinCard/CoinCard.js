import React from 'react'
import {Box, TableCell, TableRow, Typography} from "@mui/material"
import {useRouter} from "next/router"

const CoinCard = ({item,index, Styles}) => {

    const router = useRouter()

    const CoinClicked = () => {
        router.push(`SingleCoinDetails/${item.id}`)
    }

  return (
        <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={CoinClicked}
            >
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center" className={Styles.coinImageAndName}>
                <Box component={"img"} src={item.image} width={30}/>
                <Typography>{item.name}</Typography>
              </TableCell>
              <TableCell align="center">{item.current_price}</TableCell>
              <TableCell align="center">{item.market_cap}</TableCell>
              <TableCell align="center">{item.total_volume}</TableCell>
            </TableRow>
  )
}

export default CoinCard