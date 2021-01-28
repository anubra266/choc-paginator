import React from 'react'

import { Button } from '@chakra-ui/react'
import { usePaginationStyles } from '../services/styles'
export const PagButton = (props) => {
  const paginationStyles = usePaginationStyles(props)
  return (
    <Button
      onClick={!props.disabled ? props.onClick : null}
      as={props.as}
      mx={1}
      my='auto'
      {...paginationStyles}
      _focus={{ boxShadow: 'none' }}
      size={props.size}
    >
      {props.children}
    </Button>
  )
}
