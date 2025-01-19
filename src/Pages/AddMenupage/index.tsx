import React from 'react'

import { Typography } from '@mui/material'
import DisplayMenu from '../../Container/MenuDisplay'

const AddmenuPage:React.FC = () => {
  return (
    <div>
      <Typography textAlign={'center'}  variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '3rem', height: 100 }}>Menus</Typography>
      <DisplayMenu />
      
    </div>
  )
}

export default AddmenuPage 
