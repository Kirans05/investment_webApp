import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import Styles from "../styles/Assets.module.css";
import { useRouter } from "next/router";

const Assets = () => {
  const router = useRouter();

  return (
    <Box className={Styles.mainBox}>
      <Header />
      <Box
        className={Styles.basketMainBox}
        onClick={() => router.push("DetailsAssets")}
      >
        <Box
          component={"img"}
          src="https://www.pandasecurity.com/en/mediacenter/src/uploads/2021/11/pandasecurity-crypto-gaming.jpg"
          className={Styles.basketlogo}
        />
        <Box className={Styles.mainBasketRightPart}>
          <Typography className={Styles.title}>BNB Chain Ecosystem Basket</Typography>
          <Typography className={Styles.description}>
            BNB Smart Chain or BSC is a Smart Contarct Platform which runs on
            POS consensus mechanism.
          </Typography>
          <Box className={Styles.basketImagesBox}>
            <Box
              component={"img"}
              className={Styles.basketAssestsImage}
              src={
                "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
              }
            />
            <Box
              component={"img"}
              className={Styles.basketAssestsImage}
              src={
                "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
              }
            />
            <Box
              component={"img"}
              className={Styles.basketAssestsImage}
              src={
                "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663"
              }
            />
            <Box
              component={"img"}
              className={Styles.basketAssestsImage}
              src={
                "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850"
              }
            />
            <Box
              component={"img"}
              className={Styles.basketAssestsImage}
              src={
                "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389"
              }
            />
          </Box>
          <Box className={Styles.investment_amount_and_returns_box}>
            <Box>
              <Typography className={Styles.description}>Minimum Investment</Typography>
              <Typography className={Styles.description}>$4300.50</Typography>
            </Box>
            <Box>
              <Typography className={Styles.description}>
                3Y CAGR
                <Typography className={Styles.description}>114.3%</Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Assets;
