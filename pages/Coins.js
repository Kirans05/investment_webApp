import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard/CoinCard";
import Header from "../components/Header";
import Styles from "../styles/coin.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Coins = () => {
  const router = useRouter();
  const [coinData, setCoinData] = useState([]);

  const fetchCryptoCoins = async () => {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=7",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    let data = await response.json();
    console.log(data);
    setCoinData(data);
  };

  const backButtonHandler = () => {
    router.back();
  };

  useEffect(() => {
    // call api after 10s
    // setInterval(() => {
    //   fetchCryptoCoins();
    // },10000)
    
    fetchCryptoCoins()
  }, []);

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Button
        variant="contained"
        className={Styles.backButton}
        onClick={backButtonHandler}
      >
        <ArrowBackIcon /> &nbsp; Back
      </Button>
      {/* <Box className={Styles.tableContainer}>
        <TableContainer>
          <Table
            size="large"
            aria-label="a dense table"
            className={Styles.coinTable}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Sl.No</TableCell>
                <TableCell align="center">Coin</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Market Cap</TableCell>
                <TableCell align="center">Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coinData.map((item, index) => {
                return (
                  <CoinCard
                    key={index}
                    item={item}
                    index={index}
                    Styles={Styles}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
        {coinData.length == 0 ? (
          <Box className={Styles.coinPageSkeleton}>
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
            <Skeleton variant="rounded" className={Styles.skeleton} />
          </Box>
        ) : (
          <Box className={Styles.coinPageBox}>
            {
              coinData.map((item, index) => {
                return (
                  <CoinCard key={index} Styles={Styles} item={item} index={index} />
                  );
                })
              }
          </Box>
        )}
      </Box>
  );
};

export default Coins;
