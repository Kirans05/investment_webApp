// import supabase  from "../src/Config/supaBaseClient";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Link from "next/link"
import Header from '../components/Header';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Accounts';
import Dashboard from './Dashboard';
import {useState, useEffect} from "react"

const index = () => {
  return (
    <Box >
     <Header />
    </Box>
  )
}

export default index