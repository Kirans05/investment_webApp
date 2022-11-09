import { Box } from '@mui/material'
import React from 'react'
import Link from "next/link"

const Header = () => {
  return (
    <Box>
        <Box>
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