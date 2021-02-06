import React from 'react'
import { PagButton } from './pbutton'
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  Box,
  MenuOptionGroup,
  MenuItemOption,
  chakra,
  Input,
  HStack,
  Text
} from '@chakra-ui/react'
import PagContext from '../providers/pagination-provider'
import { fetchPageNumbers } from '../services/fetch-page'

export const PaginationComp = () => {
  const props = React.useContext(PagContext)
  const totalPages = Math.ceil(props.total / props.pageSize)

  const prevRender = props.itemRender(props.currentPage, 'prev')
  const nextRender = props.itemRender(props.currentPage, 'next')
  const leftRender = props.itemRender(props.currentPage, 'backward')
  const rightRender = props.itemRender(props.currentPage, 'forward')
  const jumperRender = props.itemRender(props.currentPage, 'jumper')
  const pageRender = props.itemRender(props.currentPage, 'page')
  const allRender = props.itemRender(props.currentPage, 'all')
  const totalRender = props.showTotal(props.total)

  if (!totalPages || (props.hideOnSinglePage && totalPages === 1)) return null

  const pages = fetchPageNumbers()

  const changePage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages))
    props.setCurrentPage(currentPage)
    props.onChange(currentPage, totalPages, props.pageSize, props.total)
  }

  const fastBackward = () => {
    const page = props.currentPage - props.pageNeighbours * 2 - 1
    changePage(page)
  }

  const fastForward = () => {
    const page = props.currentPage + props.pageNeighbours * 2 + 1
    changePage(page)
  }

  const backward = () => {
    changePage(props.currentPage - 1)
  }

  const forward = () => {
    changePage(props.currentPage + 1)
  }

  const changePageSize = (size) => {
    props.setPageSize(size)
    props.onShowSizeChange(props.currentPage, size)
  }

  const [simplePage, setSimplePage] = React.useState(props.currentPage)
  const [pageJumper, setPageJumper] = React.useState('')

  const simplePageUpdate = (e) => {
    e.preventDefault()
    if (isNaN(simplePage)) {
      setSimplePage(props.currentPage)
    } else {
      props.setCurrentPage(Math.max(0, Math.min(simplePage, totalPages)))
    }
  }
  const pageJumperUpdate = (e) => {
    e.preventDefault()
    if (isNaN(pageJumper)) {
      setPageJumper('')
    } else {
      props.setCurrentPage(Math.max(0, Math.min(pageJumper, totalPages)))
      setPageJumper('')
    }
  }
  return (
    props.total > 0 && (
      <Box
        {...(props.paginationProps || { w: 'full', justifyContent: 'center' })}
      >
        <chakra.span
          mx={1}
          my='auto'
          fontSize={props.size}
          display={
            props.responsive && {
              base: !props.responsive.totalRender && 'none',
              sm: 'block'
            }
          }
        >
          {totalRender}
        </chakra.span>
        {props.simple ? (
          <React.Fragment>
            <form onSubmit={simplePageUpdate}>
              <Input
                textAlign='center'
                isDisabled={props.disabled}
                my='auto'
                size={
                  props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
                }
                w={props.size === 'lg' ? 50 : 10}
                value={simplePage}
                onChange={(e) => setSimplePage(e.target.value)}
              />
            </form>
            <chakra.span
              userSelect='none'
              opacity={props.disabled ? 0.6 : 1}
              mx={1}
              my='auto'
              fontSize={props.size}
            >
              / 5
            </chakra.span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <PagButton
              as={allRender || prevRender}
              disabled={props.currentPage === 1 || props.disabled}
              onClick={backward}
              size={
                props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
              }
            >
              {!prevRender && '<'}
            </PagButton>

            {pages.map((page, index) => {
              if (page === 'LEFT')
                return (
                  <Button
                    as={allRender || rightRender}
                    key={index}
                    onClick={fastBackward}
                    size={
                      props.size === 'lg'
                        ? 'md'
                        : props.size === 'xs'
                        ? 'xs'
                        : 'sm'
                    }
                    display={
                      props.responsive && {
                        base: !props.responsive.fastBackward && 'none',
                        sm: 'block'
                      }
                    }
                    my='auto'
                  >
                    {!leftRender && '<<'}
                  </Button>
                )

              if (page === 'RIGHT')
                return (
                  <Button
                    as={allRender || rightRender}
                    key={index}
                    onClick={fastForward}
                    size={
                      props.size === 'lg'
                        ? 'md'
                        : props.size === 'xs'
                        ? 'xs'
                        : 'sm'
                    }
                    display={
                      props.responsive && {
                        base: !props.responsive.fastForward && 'none',
                        sm: 'block'
                      }
                    }
                    my='auto'
                  >
                    {!rightRender && '>>'}
                  </Button>
                )
              const active = page === props.currentPage
              return (
                <PagButton
                  as={allRender || pageRender}
                  disabled={props.disabled}
                  active={active}
                  key={`page-${index}`}
                  onClick={() => changePage(page)}
                  size={
                    props.size === 'lg'
                      ? 'md'
                      : props.size === 'xs'
                      ? 'xs'
                      : 'sm'
                  }
                  type='page'
                >
                  {page}
                </PagButton>
              )
            })}
            <PagButton
              as={allRender || nextRender}
              disabled={props.currentPage === totalPages || props.disabled}
              onClick={forward}
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
            <MenuButton
              display={
                props.responsive && {
                  base: !props.responsive.pageSize && 'none',
                  sm: 'block'
                }
              }
            >
              <PagButton
                mx={1}
                as={allRender || jumperRender || Button}
                disabled={props.disabled}
                size={
                  props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
                }
              >
                {props.pageSize} / page
              </PagButton>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup onChange={changePageSize}>
                {props.pageSizeOptions
                  .filter((opt) => opt !== props.pageSize)
                  .map((opt, oid) => (
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
            as='form'
            userSelect='none'
            opacity={props.disabled ? 0.6 : 1}
            onSubmit={pageJumperUpdate}
            display={
              props.responsive && {
                base: !props.responsive.pageJumper && 'none',
                sm: 'block'
              }
            }
          >
            <Text wordBreak='unset'>Go to:</Text>
            <Input
              width='50px'
              value={pageJumper}
              isDisabled={props.disabled}
              onChange={(e) => setPageJumper(e.target.value)}
              size={
                props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
              }
            />
          </HStack>
        )}
      </Box>
    )
  )
}
