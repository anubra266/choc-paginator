import React from 'react'

import { useColorModeValue } from '@chakra-ui/react'
import PagContext from '../providers/pagination-provider'

export const usePaginationStyles = (props) => {
  const {
    colorScheme,
    rounded,
    size,
    baseStyles,
    activeStyles,
    hoverStyles
  } = React.useContext(PagContext)

  const activeStyle = activeStyles || {
    bg: useColorModeValue(`${colorScheme}.600`, `${colorScheme}.500`),
    color: useColorModeValue('white', 'gray.200'),
    cursor: 'pointer'
  }

  const hoverStyle = !props.disabled && {
    _hover: hoverStyles || activeStyle
  }
  const baseStyle = baseStyles || {
    rounded: rounded,
    bg: useColorModeValue('white', 'gray.800'),
    color: useColorModeValue('gray.700', 'gray.200'),
    userSelect: 'none'
  }
  const getSizeStyle = (size) => {
    var styles
    switch (size) {
      case 'xs':
        styles = { px: 2, fontSize: 'xs' }
        break

      case 'sm':
        styles = { px: 3, py: 1, fontSize: 'sm' }
        break

      case 'md':
        styles = { px: 4, py: 1, fontSize: 'md' }
        break

      case 'lg':
        styles = { px: 5, py: 2, fontSize: 'lg' }
        break

      default:
        break
    }
    return styles
  }
  const sizeStyle = getSizeStyle(size)
  const disabledStyle = {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
  return {
    ...sizeStyle,
    ...baseStyle,
    ...hoverStyle,
    ...(props.active && activeStyle),
    ...(props.disabled && disabledStyle)
  }
}
