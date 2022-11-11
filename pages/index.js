import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Link from "next/link"
import Header from '../components/Header';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Accounts';


const index = () => {

  const session = useSession()
  const supabase = useSupabaseClient()
  console.log("session", session)

  return (
    // <div className="container" style={{ padding: '50px 0 100px 0' }}>
    //   {!session ? (
    //     <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={["google", "facebook"]}/>
    //   ) : (
    //     <Account  session={session}/>
    //   )}
    // </div>
    <Box >
      <Header />
    </Box>
  )
}

export default index