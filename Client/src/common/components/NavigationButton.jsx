import React from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router'

const NavigationButton = ({variant, Route, Text, color}) => {
  return (
    <Link to={Route} style={{ textDecoration: 'none' }} draggable="false">
      <Button variant={variant} color={color}>{Text}</Button>
    </Link>
  )
}

export default NavigationButton