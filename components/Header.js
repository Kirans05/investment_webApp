import { Box } from '@mui/material'
import React from 'react'
import Link from "next/link"
import Styles from "../styles/header.module.css"

const Header = () => {
  return (
    <Box className={Styles.mainBox}>
        <Box className={Styles.headerButtons}>
            <Link href={"signup"}>
                Signup
            </Link>
            <Link href={"login"}>
                Login
            </Link>
        </Box>
    </Box>
  )
}

export default Header