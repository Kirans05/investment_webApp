import React from "react";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router";

const CoinCard = ({ item, index, Styles }) => {
  const router = useRouter();

  const CoinClicked = () => {
    router.push(`SingleCoinDetails/${item.id}`);
  };

  return (
    // <TableRow
    //   hover
    //   sx={{
    //     "&:last-child td, &:last-child th": { border: 0 },

    //     "&:hover": { cursor: "pointer" },
    //   }}
    //   onClick={CoinClicked}
    // >
    //   <TableCell align="center">{index + 1}</TableCell>
    //   <TableCell align="center" className={Styles.coinImageAndName}>
    //     <Box component={"img"} src={item.image} width={30} />
    //     <Typography>{item.name}</Typography>
    //   </TableCell>
    //   <TableCell align="center">{item.current_price}</TableCell>
    //   <TableCell align="center">{item.market_cap}</TableCell>
    //   <TableCell align="center">{item.total_volume}</TableCell>
    // </TableRow>
    <Box className={Styles.coinCardMainBox}>
      <Box className={Styles.coinCardLeftPart} onClick={CoinClicked}>
        <Box component={"img"} src={item.image} width={30} />
        <Typography>{item.name}</Typography>
      </Box>
      <Box className={Styles.coindCardRightPart}>
        <Box className={Styles.market_cap}>
          <Typography>Market Cap</Typography>
          <Typography>{item.market_cap}</Typography>
        </Box>
        <Box className={Styles.total_volume}>
          <Typography>Volume</Typography>
          <Typography>{item.total_volume}</Typography>
        </Box>
        <Box className={Styles.current_price}>
          <Typography>Price</Typography>
          <Typography>${item.current_price}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CoinCard;
