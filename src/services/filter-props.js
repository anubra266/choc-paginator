import React from 'react'
import { defaultData } from '../providers/pagination-provider'

const methods = ['itemRender', 'setCurrentPage']
const nonMethods = Object.keys(defaultData).filter((k) => !methods.includes(k))

export const filterProps = (props) => {
  const validProps = nonMethods.reduce((acc, nxt) => {
    acc.push(props[nxt])
    return acc
  }, [])
  return React.useMemo(() => props, validProps)
}
