import React from 'react';
import { PagButton } from './pbutton';
import {
  Menu,
  MenuButton,
  MenuList,
  Box,
  MenuOptionGroup,
  MenuItemOption,
  chakra,
  Input,
  HStack,
  Text,
} from '@chakra-ui/react';
import PagContext, { Responsives } from '../providers/pagination-provider';
import { fetchPageNumbers } from '../services/fetch-page';

export const PaginationComp = () => {
  const props = React.useContext(PagContext);
  const totalPages = Math.ceil(props.total / props.pageSize);

  const prevRender = props.itemRender(props.currentPage, 'prev');
  const nextRender = props.itemRender(props.currentPage, 'next');
  const leftRender = props.itemRender(props.currentPage, 'backward');
  const rightRender = props.itemRender(props.currentPage, 'forward');
  const pageSizeRender = props.itemRender(props.pageSize, 'pageSize');
  const pageRender = props.itemRender(props.currentPage, 'page');
  const totalRender = props.showTotal(props.total);

  if (!totalPages || (props.hideOnSinglePage && totalPages === 1)) return null;

  const pages = fetchPageNumbers();

  const changePage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    props.setCurrentPage(currentPage);
    props.onChange(currentPage, totalPages, props.pageSize, props.total);
  };

  const gotoPage = (evt: any, page: number) => {
    evt.preventDefault()
    changePage(page);
  };

  const fastBackward = (evt: any) => {
    evt.preventDefault()
    const page = props.currentPage - props.pageNeighbours * 2 - 1;
    changePage(page);
  };

  const fastForward = (evt: any) => {
    evt.preventDefault()
    const page = props.currentPage + props.pageNeighbours * 2 + 1;
    changePage(page);
  };

  const backward = (evt: any) => {
    evt.preventDefault()
    changePage(props.currentPage - 1);
  };

  const forward = (evt: any) => {
    evt.preventDefault()
    changePage(props.currentPage + 1);
  };

  const changePageSize = (size: any) => {
    props.setPageSize(size);
    props.onShowSizeChange(props.currentPage, size);
  };

  const [simplePage, setSimplePage] = React.useState<any>(props.currentPage);
  const [pageJumper, setPageJumper] = React.useState<any>('');

  const simplePageUpdate = (e: any) => {
    e.preventDefault();
    if (isNaN(simplePage)) {
      setSimplePage(props.currentPage);
    } else {
      props.setCurrentPage(Math.max(0, Math.min(simplePage, totalPages)));
    }
  };
  const pageJumperUpdate = (e: any) => {
    e.preventDefault();
    if (isNaN(pageJumper)) {
      setPageJumper('');
    } else {
      props.setCurrentPage(Math.max(0, Math.min(pageJumper, totalPages)));
      setPageJumper('');
    }
  };

  const responsiveDisplay = (type: Responsives) => {
    if (props.responsive) {
      if (
        typeof props.responsive !== 'boolean' &&
        Object.keys(props.responsive).includes(type)
      ) {
        return {
          display: 'block',
        };
      }
      return { display: ['none', 'block'] };
    }
    return {};
  };

  const hrefLink = (page: number) => {
    if (props.basePath && page > 0 && page !== props.currentPage) {
      return {
        href: `${props.basePath}${page}`
      }
    }

    return {}
  }

  return props.total > 0 ? (
    <Box
      {...(props.paginationProps || { w: 'full', justifyContent: 'center' })}
    >
      {totalRender !== null && (
        <chakra.span
          mx={1}
          my="auto"
          fontSize={props.size}
          {...responsiveDisplay('totalRender')}
        >
          {totalRender}
        </chakra.span>
      )}
      {props.simple ? (
        <React.Fragment>
          <form onSubmit={simplePageUpdate}>
            <Input
              textAlign="center"
              isDisabled={props.disabled}
              my="auto"
              size={
                props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
              }
              w={props.size === 'lg' ? 50 : 10}
              value={simplePage}
              onChange={e => setSimplePage(e.target.value)}
            />
          </form>
          <chakra.span
            userSelect="none"
            opacity={props.disabled ? 0.6 : 1}
            mx={1}
            my="auto"
            fontSize={props.size}
          >
            / 5
          </chakra.span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PagButton
            as={prevRender}
            disabled={props.currentPage === 1 || props.disabled}
            onClick={backward}
            {...hrefLink(props.currentPage - 1)}
            size={
              props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
            }
          >
            {!prevRender && '<'}
          </PagButton>

          {pages.map((page, index) => {
            if (page === 'LEFT')
              return (
                <PagButton
                  as={leftRender}
                  key={index}
                  onClick={fastBackward}
                  {...hrefLink(props.currentPage - props.pageNeighbours * 2 - 1)}
                  size={
                    props.size === 'lg'
                      ? 'md'
                      : props.size === 'xs'
                      ? 'xs'
                      : 'sm'
                  }
                  {...responsiveDisplay('fastBackward')}
                  my="auto"
                >
                  {!leftRender && '<<'}
                </PagButton>
              );

            if (page === 'RIGHT')
              return (
                <PagButton
                  as={rightRender}
                  key={index}
                  onClick={fastForward}
                  {...hrefLink(props.currentPage + props.pageNeighbours * 2 + 1)}
                  size={
                    props.size === 'lg'
                      ? 'md'
                      : props.size === 'xs'
                      ? 'xs'
                      : 'sm'
                  }
                  {...responsiveDisplay('fastForward')}
                  my="auto"
                >
                  {!rightRender && '>>'}
                </PagButton>
              );
            const active = page === props.currentPage;
            return (
              <PagButton
                as={pageRender}
                disabled={props.disabled}
                active={active}
                key={`page-${index}`}
                onClick={(evt: any) => gotoPage(evt, page)}
                {...hrefLink(page)}
                size={
                  props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
                }
                type="page"
              >
                {page}
              </PagButton>
            );
          })}
          <PagButton
            as={nextRender}
            disabled={props.currentPage === totalPages || props.disabled}
            onClick={forward}
            {...hrefLink(props.currentPage + 1)}
            size={
              props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
            }
          >
            {!nextRender && '>'}
          </PagButton>
        </React.Fragment>
      )}
      {props.showSizeChanger && (
        <Menu>
          <PagMenuButton
            ml={1}
            as={pageSizeRender}
            disabled={props.disabled}
            size={
              props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
            }
          >
            {props.pageSize} / page
          </PagMenuButton>
          <MenuList>
            <MenuOptionGroup onChange={changePageSize}>
              {props.pageSizeOptions
                .filter((opt: any) => opt !== props.pageSize)
                .map((opt: any, oid: number) => (
                  <MenuItemOption
                    fontSize={props.size}
                    value={opt.toString()}
                    key={`size${oid}`}
                  >
                    {opt} / page
                  </MenuItemOption>
                ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      )}
      {props.showQuickJumper && (
        <HStack
          as="form"
          userSelect="none"
          opacity={props.disabled ? 0.6 : 1}
          ml={2}
          onSubmit={pageJumperUpdate}
          {...responsiveDisplay('pageJumper')}
        >
          <Text wordBreak="unset">Go to:</Text>
          <Input
            width="50px"
            value={pageJumper}
            isDisabled={props.disabled}
            onChange={e => setPageJumper(e.target.value)}
            size={
              props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
            }
          />
        </HStack>
      )}
    </Box>
  ) : null;
};

const PagMenuButton = (props: any) => <MenuButton as={PagButton} {...props} />;
