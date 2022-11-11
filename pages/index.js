import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Link from "next/link"
import Header from '../components/Header';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Accounts';
import Dashboard from './Dashboard';


const index = () => {

  const session = useSession()

  return (
    <Box >
      {
        !session ? <Header />
        : <Dashboard session={session}/>
      }
    </Box>
  )
}

export default index