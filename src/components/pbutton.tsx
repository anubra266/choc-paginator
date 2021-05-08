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
  const { responsive } = React.useContext(PagContext);
  const paginationStyles: any = usePaginationStyles(props);
  const display: any = {
    display: [
      responsive && handleResponsive({ ...props, responsive }),
      'block',
    ],
  };
  const onClick: any = !props.disabled ? props.onClick : null;

  return (
    <Button
      onClick={onClick}
      as={props.as}
      mx={1}
      my="auto"
      {...paginationStyles}
      _focus={{ boxShadow: 'none' }}
      size={props.size}
      {...display}
    >
      {props.children}
    </Button>
  );
};
