// import supabase  from "../src/Config/supaBaseClient";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Link from "next/link"
import Header from '../components/Header';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Dashboard from './Dashboard';
import {useState, useEffect} from "react"

const index = () => {

  const [indexPageRrender, setIndexPageRerender] = useState(true)

  useEffect(() => {

  },[indexPageRrender])

  console.log("first")
  return (
    <Box >
     <Header setIndexPageRerender={setIndexPageRerender} indexPageRrender={indexPageRrender}/>
    </Box>
  )
}

export default index