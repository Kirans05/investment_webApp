import { TableCell, TableRow } from '@mui/material'
import React from 'react'

const PositionsCard = ({item,index}) => {
  return (
    <TableRow
    hover
    sx={{ '&:last-child td, &:last-child th': { border: 0 },
  
  "&:hover":{cursor:"pointer"}}}
  >
    <TableCell align="center">{index+1}</TableCell>
    <TableCell align="center">{item.coinid}</TableCell>
    <TableCell align='center'>
    {item.units_purchase}
    </TableCell>
    <TableCell align="center">{item.price_purchased}</TableCell>
    <TableCell align="center">{item.created_at}</TableCell>
  </TableRow>
  )
}

export default PositionsCard