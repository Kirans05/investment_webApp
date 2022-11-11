import { Box } from '@mui/material'
import React from 'react'
import Link from "next/link"
import Styles from "../styles/header.module.css"

const Header = () => {
  return (
    <Box className={Styles.mainBox}>
        <Box className={Styles.headerButtons}>
            <Link href={"signup"}>
                <h1 className={Styles.h1}>Signup</h1>
            </Link>
            <Link href={"login"}>
            <h1 className={Styles.h1}>Login</h1>
            </Link>
        </Box>
    </Box>
  )
}

export default Header