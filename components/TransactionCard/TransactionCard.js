import { Box, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'

const TransactionCard = ({item, Styles}) => {
    let transactionItem = JSON.parse(item) 
  return (
    <TableRow
    hover
    sx={{ '&:last-child td, &:last-child th': { border: 0 },
  
  "&:hover":{cursor:"pointer"}}}
  >
    <TableCell align="center">{transactionItem.from}</TableCell>
    <TableCell align="center">{transactionItem.to}</TableCell>
    <TableCell align='center'>
    {transactionItem.amount}
    </TableCell>
    <TableCell align="center">{transactionItem.message}</TableCell>
    <TableCell align="center">{transactionItem.date}</TableCell>
    <TableCell align="center">{transactionItem.type}</TableCell>
  </TableRow>
  )
}

export default TransactionCard