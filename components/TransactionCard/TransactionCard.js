import { Box, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'

const TransactionCard = ({item, Styles, index}) => {
  return (
    <TableRow
    hover
    sx={{ '&:last-child td, &:last-child th': { border: 0 },
  
  "&:hover":{cursor:"pointer"}}}
  >
    <TableCell align="center">{index+1}</TableCell>
    <TableCell align="center">{item.sender}</TableCell>
    <TableCell align="center">{item.receiver}</TableCell>
    <TableCell align='center'>
    {item.amount}
    </TableCell>
    <TableCell align="center">{item.message}</TableCell>
    <TableCell align="center">{item.created_at}</TableCell>
    <TableCell align="center">{item.type}</TableCell>
  </TableRow>
  )
}

export default TransactionCard