import React from 'react'

import { Button } from '@chakra-ui/react'
import { usePaginationStyles } from '../services/styles'
import PagContext from '../providers/pagination-provider'

const handleResponsive = (props) => {
  const { type, active, responsive } = props
  let show = true
  switch (type) {
    case 'page':
      if (!active) show = false
      else if (!responsive.activePage) show = false
      break

    default:
      break
  }
  return !show && 'none'
}
export const PagButton = (props) => {
  const { responsive } = React.useContext(PagContext)
  const paginationStyles = usePaginationStyles(props)
  const display = responsive && handleResponsive({ ...props, responsive })
  return (
    <Button
      onClick={!props.disabled ? props.onClick : null}
      as={props.as}
      mx={1}
      my='auto'
      {...paginationStyles}
      _focus={{ boxShadow: 'none' }}
      size={props.size}
      display={{ base: display, sm: 'block' }}
    >
      {props.children}
    </Button>
  )
}
