import { Divider, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const PortfolioCard = ({ item, index, Styles }) => {
  return (
    //   <TableRow
    //   hover
    //   sx={{ '&:last-child td, &:last-child th': { border: 0 },

    // "&:hover":{cursor:"pointer"}}}
    // >
    //   <TableCell align="center">{index+1}</TableCell>
    //   <TableCell align="center">{item.coinid}</TableCell>
    //   <TableCell align='center'>
    //   {item.units_purchase}
    //   </TableCell>
    //   <TableCell align="center">{item.price_purchased}</TableCell>
    //   <TableCell align="center">{item.created_at}</TableCell>
    // </TableRow>
    <>
      <Box className={Styles.portfolioCardMainBox}>
        <Box className={Styles.portfolioCardLeftPart}>
          <Typography className={Styles.coindId}>{item.coinid}</Typography>
          <Typography className={Styles.units}>
            units - {item.units_purchase}
          </Typography>
        </Box>
        <Box className={Styles.portfolioCardRightPart}>
          <Typography className={Styles.totalPrice}>
            ${item.price_purchased}
          </Typography>
          <Typography className={Styles.purchaseDate}>
            {new Date(item.created_at).toString().substring(0, 24)}
          </Typography>
        </Box>
      </Box>
      <Divider className={Styles.divider}/>
    </>
  );
};

export default PortfolioCard;
