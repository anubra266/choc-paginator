import React from 'react';

import { Button } from '@chakra-ui/react';
import { usePaginationStyles } from '../services/styles';
import PagContext from '../providers/pagination-provider';

const handleResponsive = (props: any) => {
  const { type, active, responsive } = props;
  let show = true;
  switch (type) {
    case 'page':
      if (!active) show = false;
      else if (!responsive.activePage) show = false;
      break;

    default:
      break;
  }
  return !show && 'none';
};

export const PagButton = (props: any) => {
  const { responsive, focusRing } = React.useContext(PagContext);
  const paginationStyles: any = usePaginationStyles(props);
  const display: any = {
    display: [
      responsive && handleResponsive({ ...props, responsive }),
      'block',
    ],
  };
  const onClick: any = !props.disabled ? props.onClick : null;
  const href: any = props.href ? {href: props.href} : {}

  const focusRingStyles = {
    boxShadow: focusRing
      ? typeof focusRing === 'string'
        ? `0 0 0 3px ${focusRing}`
        : `0 0 0 3px rgba(66, 153, 225, 0.6)`
      : 'none',
  };
  return (
    <Button
      onClick={onClick}
      as={props.as}
      mx={1}
      my="auto"
      {...paginationStyles}
      _first={{ ml: 0 }}
      _last={{ mr: 0 }}
      _focus={focusRingStyles}
      size={props.size}
      {...display}
      {...href}
    >
      {props.children}
    </Button>
  );
};
