import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import Link from "next/link"
import Styles from "../styles/header.module.css"
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {useRouter} from "next/router"



const Header = () => {

  const fontsize = "20px"
  const router = useRouter()
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
    if(type == "login"){
      router.push("login")
    }else if(type == "signup"){
      router.push("signup")
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    const fontsize = "20px"
    return <Box
      className={Styles.drawer}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography fontSize={fontsize} className={Styles.drawerTypograpy} onClick={()=> router.push("signup")}>Sign Up</Typography>
      <Typography fontSize={fontsize} className={Styles.drawerTypograpy} onClick={()=> router.push("login")}>Login</Typography>
    </Box>
  };


  return (
    <Box className={Styles.mainBox}>
      <Box className={Styles.leftHeader}>
        <MenuIcon className={Styles.menuIcon} onClick={toggleDrawer("left", true)}/>
        <Typography fontSize={fontsize}>Investment App</Typography>
      </Box>
      <Box className={Styles.rightHeader}>
        <Box className={Styles.account}>
            <PermIdentityIcon />
            <Typography fontSize={fontsize} onClick={handleClick}>Account</Typography>
        </Box>
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
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose("signup")}>Sign Up</MenuItem>
        <MenuItem onClick={() => handleClose("login")}>Login</MenuItem>
      </Menu>
    </Box>
  )
}

export default Header