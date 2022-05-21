import { Box } from '@chakra-ui/react'
import { Sidebar } from 'components'
import React from 'react'

const UserProfile = () => {
  return (
    <Box p='1rem' display='flex'>
      <Sidebar/>
      <Box>
        UserProfile
      </Box>
    </Box>
  )
}

export default UserProfile