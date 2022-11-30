import { Box, Divider, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import SouthEastIcon from "@mui/icons-material/SouthEast";

const TransactionCard = ({ item, Styles, index }) => {
  return (
    //   <TableRow
    //   hover
    //   sx={{ '&:last-child td, &:last-child th': { border: 0 },

    // "&:hover":{cursor:"pointer"}}}
    // >
    //   <TableCell align="center">{index+1}</TableCell>
    //   <TableCell align="center">{item.sender}</TableCell>
    //   {/* <TableCell align="center">{item.receiver}</TableCell> */}
    //   <TableCell align='center'>
    //   {item.amount}
    //   </TableCell>
    //   <TableCell align="center">{item.message}</TableCell>
    //   <TableCell align="center">{item.created_at}</TableCell>
    //   <TableCell align="center">{item.type}</TableCell>
    // </TableRow>
    <>
      <Box className={Styles.transactionCardMainBox}>
        <Box className={Styles.transactionCardLeftPart}>
          {item.type == "debit" ? <NorthWestIcon style={{color:"red"}}/> : <SouthEastIcon style={{color:"green"}}/>}
          <Box className={Styles.transactionMsgAndDate}>
            <Typography className={Styles.transactionMsg}>{item.message}</Typography>
            <Typography className={Styles.transactionDate}>{new Date(item.created_at).toString().substring(0,24)}</Typography>
          </Box>
        </Box>
        <Box className={Styles.transactionCardRightPart}>
          {item.type == "debit" ? (
            <Typography style={{color:"red"}} className={Styles.transactionamount}>- {item.amount}</Typography>
          ) : (
            <Typography style={{color:"green"}} className={Styles.transactionamount}>+ {item.amount}</Typography>
          )}
        </Box>
      </Box>
      <Divider className={Styles.divider}/>
    </>
  );
};

export default TransactionCard;
