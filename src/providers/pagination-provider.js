import React from 'react'

export const defaultData = {
  current: null, //*
  defaultCurrent: 1, //*
  defaultPage: 1, //*
  defaultPageSize: 10, //*
  disabled: false, //*
  hideOnSinglePage: false, //*
  itemRender: () => null, //*
  pageSize: null, //*
  pageNeighbours: 0, //* indicates the number of additional page numbers to show on each side of the current page.
  pageSizeOptions: [10, 20, 50, 100], //*
  paginationProps: null, //*
  responsive: false, //*
  showQuickJumper: false, //*
  showSizeChanger: null, //*
  showTotal: () => '', //*
  simple: null, //*
  total: 0, //*
  onChange: () => '', //*
  onShowSizeChange: () => '', //*
  size: 'md', //*
  rounded: 'md', //*
  baseStyles: null, //*
  activeStyles: null, //*
  hoverStyles: null, //*
  colorScheme: 'green' //*
}
const PaginationContext = React.createContext({
  ...defaultData
})

export default PaginationContext
