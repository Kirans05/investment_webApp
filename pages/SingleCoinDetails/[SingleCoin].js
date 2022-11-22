import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useRouter } from "next/router";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

const SingleCoin = () => {
  const router = useRouter().query.SingleCoin;
  const chartRef = useRef();
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  const [NoOfDays, setNoOfDays] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (num) => {
    setNoOfDays(num);
    setAnchorEl(null);
  };

  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      type: "logarithmic",
      crosshair: {
        color: "#4E7DD9",
        dashStyle: "Dash",
      },
      ordinal: false,
      minRange: 1,
      labels: {
        formatter: function () {
          return new Date(this.value).toString().slice(4, 10);
        },
      },
    },
    yAxis: {
      opposite: true,
      labels: {
        formatter: function () {
          return numberFormat.format(this.value);
        },
      },
      gridLineDashStyle: "Dash",
      gridLineColor: "#01052D40",
      gridLineWidth: 0.5,
      // min: yAxisMin,
    },
    series: [
      {
        type: "spline",
        // type: 'areaspline',
        name: "Price",
        data: null,
        lineWidth: 2,
        lineColor: "#4E7DD9",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(78, 125, 217, 0.4)"],
            [1, "rgba(78, 125, 217, 0.05)"],
          ],
        },
        marker: {
          fillColor: "white",
          lineWidth: 2,
          radius: 3,
          lineColor: "#4E7DD9",
        },
        animation: {
          duration: 1500,
        },
      },
    ],
    chart: {
      backgroundColor: "transparent",
      // zoomType: "x",
    },
    navigation: {
      enabled: false,
      buttonOptions: {
        enabled: false,
      },
    },
    rangeSelector: { enabled: false },
    credits: { enabled: false },
    tooltip: {
      animation: true,
      // xDateFormat: "",
      useHTML: true,
      backgroundColor: "rgba(255, 255, 255)",
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "#B0C4DB",
      shadow: {
        offsetX: 1,
        offsetY: 2,
        width: 2,
        opacity: 0.05,
      },
      shape: "square",
      // split: true,
      hideDelay: 100,
      outside: false,
    },
    navigator: {
      handles: {
        // lineWidth: 1,
        width: 20,
        height: 30,
      },
      maskFill: "rgba(78, 125, 217, 0.2)",
      outlineWidth: 0,
      enabled: false,
      xAxis: {},
    },
    scrollbar: {
      enabled: false,
    },
  });

  const fetchChartDetails = async () => {
    let response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${router}/market_chart?vs_currency=usd&days=${NoOfDays}`
    );

    let data = await response.json();
    setChartOptions({
      series: {
        data: data.prices,
      },
    });
  };

  useEffect(() => {
    fetchChartDetails();
  }, [NoOfDays]);

  return (
    <Box>
      <Typography component={"h1"} fontSize={30}>
        Charts
      </Typography>
      <Typography component={"h1"} fontSize={30}>
        {router}
      </Typography>
      <Button onClick={handleClick} variant={"contained"}>
        {NoOfDays}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(1)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose(1)}>1</MenuItem>
        <MenuItem onClick={() => handleClose(2)}>2</MenuItem>
        <MenuItem onClick={() => handleClose(3)}>3</MenuItem>
        <MenuItem onClick={() => handleClose(4)}>4</MenuItem>
        <MenuItem onClick={() => handleClose(5)}>5</MenuItem>
        <MenuItem onClick={() => handleClose(6)}>6</MenuItem>
        <MenuItem onClick={() => handleClose(7)}>7</MenuItem>
        <MenuItem onClick={() => handleClose(8)}>8</MenuItem>
        <MenuItem onClick={() => handleClose(9)}>9</MenuItem>
        <MenuItem onClick={() => handleClose(10)}>10</MenuItem>
        <MenuItem onClick={() => handleClose(11)}>11</MenuItem>
        <MenuItem onClick={() => handleClose(12)}>12</MenuItem>
        <MenuItem onClick={() => handleClose(13)}>13</MenuItem>
        <MenuItem onClick={() => handleClose(14)}>14</MenuItem>
        <MenuItem onClick={() => handleClose(15)}>15</MenuItem>
        <MenuItem onClick={() => handleClose(16)}>16</MenuItem>
        <MenuItem onClick={() => handleClose(17)}>17</MenuItem>
        <MenuItem onClick={() => handleClose(18)}>18</MenuItem>
        <MenuItem onClick={() => handleClose(19)}>19</MenuItem>
        <MenuItem onClick={() => handleClose(20)}>20</MenuItem>
        <MenuItem onClick={() => handleClose(21)}>21</MenuItem>
        <MenuItem onClick={() => handleClose(22)}>22</MenuItem>
        <MenuItem onClick={() => handleClose(23)}>23</MenuItem>
        <MenuItem onClick={() => handleClose(24)}>24</MenuItem>
        <MenuItem onClick={() => handleClose(25)}>25</MenuItem>
        <MenuItem onClick={() => handleClose(26)}>26</MenuItem>
        <MenuItem onClick={() => handleClose(27)}>27</MenuItem>
        <MenuItem onClick={() => handleClose(28)}>28</MenuItem>
        <MenuItem onClick={() => handleClose(29)}>29</MenuItem>
        <MenuItem onClick={() => handleClose(30)}>30</MenuItem>
      </Menu>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType="chart"
        ref={chartRef}
      />
    </Box>
  );
};

export default SingleCoin;
