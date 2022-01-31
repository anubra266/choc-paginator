import { As, BoxProps } from '@chakra-ui/react';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';

export const defaultData = {
  current: null, //*
  defaultCurrent: 1, //*
  defaultPage: 1, //*
  defaultPageSize: 10, //*
  disabled: false, //*
  hideOnSinglePage: false, //*
  itemRender: () => null, //*
  pageSize: 0, //*
  pageNeighbours: 0, //* indicates the number of additional page numbers to show on each side of the current page.
  pageSizeOptions: [10, 20, 50, 100], //*
  paginationProps: null, //*
  responsive: false, //*
  showQuickJumper: false, //*
  showSizeChanger: null, //*
  showTotal: () => null, //*
  simple: null, //*
  total: 0, //*
  onChange: () => '', //*
  onShowSizeChange: () => '', //*
  size: 'md', //*
  rounded: 'md', //*
  baseStyles: null, //*
  activeStyles: null, //*
  hoverStyles: null, //*
  colorScheme: 'brand', //*
  focusRing: false, //*
  basePath: null, //*
};

export type DefaultData = typeof defaultData;

export type Responsives =
  | 'activePage'
  | 'totalRender'
  | 'fastBackward'
  | 'fastForward'
  | 'pageSize'
  | 'pageJumper';

export interface Pagination {
  current: number | null; //*
  defaultCurrent: number; //*
  defaultPage: number; //*
  defaultPageSize: number; //*
  disabled: boolean; //*
  hideOnSinglePage: boolean; //*
  itemRender: (
    currentPage?: Pagination['currentPage'],
    type?: string
  ) => As<any> | any;
  pageSize: number; //*
  pageNeighbours: number; //* indicates the number of additional page numbers to show on each side of the current page.
  pageSizeOptions: number[]; //*
  paginationProps: BoxProps | null; //*
  responsive: Partial<Record<Responsives, boolean>> | boolean;
  showQuickJumper: boolean; //*
  showSizeChanger: boolean | null; //*
  showTotal: (total?: number) => ReactElement | any;
  simple: boolean | null; //*
  total: number; //*
  onChange: (
    currentPage?: Pagination['currentPage'],
    totalPages?: number,
    pageSize?: Pagination['pageSize'],
    total?: number
  ) => void;
  onShowSizeChange: (
    currentPage?: Pagination['currentPage'],
    size?: number
  ) => void;
  size: string; //*
  rounded: string; //*
  colorScheme: string; //*
  baseStyles: BoxProps | null;
  activeStyles: BoxProps | null;
  hoverStyles: BoxProps | null;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<Pagination['currentPage']>>;
  setPageSize: Dispatch<SetStateAction<Pagination['pageSize']>>;
  focusRing: boolean | string;
  basePath: string | null;
}

const PaginationContext = React.createContext({} as Pagination);

export default PaginationContext;
