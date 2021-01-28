import React from 'react'

import PagContext from './providers/pagination-provider'
import { PaginationComp } from './components/pagination'

import { filterProps } from './services/filter-props'

const Pagination = (props) => {
  const defaultProps = React.useContext(PagContext)
  const allProps = { ...defaultProps, ...props }
  const [currentPage, setCurrentPage] = React.useState(
    allProps.current || allProps.defaultCurrent
  )
  React.useEffect(() => {
    props.current && setCurrentPage(props.current)
  }, [props.current])
  const [pageSize, setPageSize] = React.useState(
    allProps.pageSize || allProps.defaultPageSize
  )
  const contextvalue = { ...allProps }
  const value = React.useMemo(() => {
    return {
      ...contextvalue,
      currentPage,
      setCurrentPage,
      pageSize,
      setPageSize
    }
  }, [filterProps(contextvalue), currentPage, pageSize])
  return (
    <PagContext.Provider value={value}>
      <PaginationComp />
    </PagContext.Provider>
  )
}

export default Pagination
