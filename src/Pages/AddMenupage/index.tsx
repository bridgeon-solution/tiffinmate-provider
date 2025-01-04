import React from 'react'
import AddMenuContainer from '../../Container/AddMenu'
import { Typography } from '@mui/material'
import DisplayMenu from '../../Container/MenuDisplay'

const AddmenuPage:React.FC = () => {
  return (
    <div>
      <Typography textAlign={'center'}  variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '3rem', height: 100 }}>Menus</Typography>
      <DisplayMenu />
      <AddMenuContainer/>
    </div>
  )
}

export default AddmenuPage 
