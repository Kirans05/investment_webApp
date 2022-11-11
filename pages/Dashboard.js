import { Box, Button, Typography } from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import React from 'react'

const Dashboard = ({session}) => {

  console.log("session", session)

  const supabase = useSupabaseClient()
  const user = useUser()
  console.log("user", user)

  const signOut = async () => {
    const res = await supabase.auth.signOut()
    console.log("res", res)
  }

  return (
    <Box sx={{width:"100%", height:"56vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", rowGap:"20px"}}>
        <Typography>welcome to dashboard</Typography>
        <Button variant="contained" onClick={signOut}>signout</Button>
    </Box>
)
}

export default Dashboard
