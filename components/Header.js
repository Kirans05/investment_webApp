import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "../styles/header.module.css";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useRouter } from "next/router";
import supabase from "../src/Config/supaBaseClient";

const Header = () => {
  const router = useRouter();
  const [userExist, setUserExist] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type) => {
    setAnchorEl(null);
    if (type == "login") {
      router.push("login");
    } else if (type == "signup") {
      router.push("signup");
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    return (
      <Box
        className={Styles.drawer}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("signup")}
          sx={{ display: userExist == false ? "flex" : "none" }}
        >
          Sign Up
        </Typography>
        <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("login")}
          sx={{ display: userExist == false ? "flex" : "none" }}
        >
          Login
        </Typography>
        <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("Dashboard")}
          sx={{ display: userExist == true ? "flex" : "none" }}
        >
          DashBoard
        </Typography>
        <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("Portfolio")}
          sx={{ display: userExist == true ? "flex" : "none" }}
        >
          PortFolio
        </Typography>
        <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("Fund")}
          sx={{ display: userExist == true ? "flex" : "none" }}
        >
          Add Fund
        </Typography>
        <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("Transactions")}
          sx={{ display: userExist == true ? "flex" : "none" }}
        >
          Transactions
        </Typography>
        <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("Coins")}
          sx={{ display: userExist == true ? "flex" : "none" }}
        >
          Show Assets
        </Typography>
        {/* <Typography
          className={Styles.drawerTypograpy}
          onClick={() => router.push("Positions")}
          sx={{ display: userExist == true ? "flex" : "none" }}
        >
          Positions
        </Typography> */}
        <Typography className={Styles.drawerTypograpy} onClick={signOut}
        sx={{ display: userExist == true ? "flex" : "none" }}
        >
          Signout
        </Typography>
      </Box>
    );
  };

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    let user = localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token");
    if (user == null) {
    } else {
      setUserExist(true);
    }
  }, []);

  return (
    <Box className={Styles.mainBox}>
      <Box className={Styles.leftHeader}>
        <MenuIcon
          className={Styles.menuIcon}
          onClick={toggleDrawer("left", true)}
        />
        <Typography className={Styles.webSiteTitle}>Investment App</Typography>
      </Box>
      <Box className={Styles.rightHeader}>
        {userExist == true ? null : (
          <Box className={Styles.account}>
            <PermIdentityIcon />
            <Typography
              onClick={handleClick}
              className={Styles.accountTypography}
            >
              Account
            </Typography>
          </Box>
        )}
        {userExist == false ? null : (
          <Box className={Styles.rightHeaderOptions}>
            <Typography
              className={Styles.rightHeaderOptiontypography}
              onClick={() => router.push("Fund")}
            >
              Add Fund
            </Typography>
            <Typography
              className={Styles.rightHeaderOptiontypography}
              onClick={() => router.push("Transactions")}
            >
              Transactions
            </Typography>
            <Typography
              className={Styles.rightHeaderOptiontypography}
              onClick={() => router.push("Coins")}
            >
              Show Assets
            </Typography>
            <Typography className={Styles.signoutTypography} onClick={signOut}>
              Signout
            </Typography>
          </Box>
        )}
      </Box>

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("signup")}>Sign Up</MenuItem>
        <MenuItem onClick={() => handleClose("login")}>Login</MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
