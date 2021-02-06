import React from 'react';
import { useColorModeValue, Button, Box, chakra, Input, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, HStack, Text } from '@chakra-ui/react';

const defaultData = {
  current: null,
  defaultCurrent: 1,
  defaultPage: 1,
  defaultPageSize: 10,
  disabled: false,
  hideOnSinglePage: false,
  itemRender: () => null,
  pageSize: null,
  pageNeighbours: 0,
  pageSizeOptions: [10, 20, 50, 100],
  paginationProps: null,
  responsive: false,
  showQuickJumper: false,
  showSizeChanger: null,
  showTotal: () => '',
  simple: null,
  total: 0,
  onChange: () => '',
  onShowSizeChange: () => '',
  size: 'md',
  rounded: 'md',
  baseStyles: null,
  activeStyles: null,
  hoverStyles: null,
  colorScheme: 'brand'
};
const PaginationContext = React.createContext({ ...defaultData
});

const usePaginationStyles = props => {
  const {
    colorScheme,
    rounded,
    size,
    baseStyles,
    activeStyles,
    hoverStyles
  } = React.useContext(PaginationContext);
  const activeStyle = activeStyles || {
    bg: useColorModeValue(`${colorScheme}.600`, `${colorScheme}.500`),
    color: useColorModeValue('white', 'gray.200'),
    cursor: 'pointer'
  };
  const hoverStyle = !props.disabled && {
    _hover: hoverStyles || activeStyle
  };
  const baseStyle = baseStyles || {
    rounded: rounded,
    bg: useColorModeValue('white', 'gray.800'),
    color: useColorModeValue('gray.700', 'gray.200'),
    userSelect: 'none'
  };

  const getSizeStyle = size => {
    var styles;

    switch (size) {
      case 'xs':
        styles = {
          px: 2,
          fontSize: 'xs'
        };
        break;

      case 'sm':
        styles = {
          px: 3,
          py: 1,
          fontSize: 'sm'
        };
        break;

      case 'md':
        styles = {
          px: 4,
          py: 1,
          fontSize: 'md'
        };
        break;

      case 'lg':
        styles = {
          px: 5,
          py: 2,
          fontSize: 'lg'
        };
        break;
    }

    return styles;
  };

  const sizeStyle = getSizeStyle(size);
  const disabledStyle = {
    opacity: 0.6,
    cursor: 'not-allowed'
  };
  return { ...sizeStyle,
    ...baseStyle,
    ...hoverStyle,
    ...(props.active && activeStyle),
    ...(props.disabled && disabledStyle)
  };
};

const handleResponsive = props => {
  const {
    type,
    active,
    responsive
  } = props;
  let show = true;

  switch (type) {
    case 'page':
      if (!active) show = false;else if (!responsive.activePage) show = false;
      break;
  }

  return !show && 'none';
};

const PagButton = props => {
  const {
    responsive
  } = React.useContext(PaginationContext);
  const paginationStyles = usePaginationStyles(props);
  const display = responsive && handleResponsive({ ...props,
    responsive
  });
  return /*#__PURE__*/React.createElement(Button, Object.assign({
    onClick: !props.disabled ? props.onClick : null,
    as: props.as,
    mx: 1,
    my: "auto"
  }, paginationStyles, {
    _focus: {
      boxShadow: 'none'
    },
    size: props.size,
    display: {
      base: display,
      sm: 'block'
    }
  }), props.children);
};

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const fetchPageNumbers = () => {
  const props = React.useContext(PaginationContext);
  const totalPages = Math.ceil(props.total / props.pageSize);
  const currentPage = props.currentPage;
  const pageNeighbours = props.pageNeighbours;
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages = range(startPage, endPage);
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      case hasLeftSpill && !hasRightSpill:
        {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

      case !hasLeftSpill && hasRightSpill:
        {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

      case hasLeftSpill && hasRightSpill:
      default:
        {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
};

const PaginationComp = () => {
  const props = React.useContext(PaginationContext);
  const totalPages = Math.ceil(props.total / props.pageSize);
  const prevRender = props.itemRender(props.currentPage, 'prev');
  const nextRender = props.itemRender(props.currentPage, 'next');
  const leftRender = props.itemRender(props.currentPage, 'backward');
  const rightRender = props.itemRender(props.currentPage, 'forward');
  const jumperRender = props.itemRender(props.currentPage, 'jumper');
  const pageRender = props.itemRender(props.currentPage, 'page');
  const allRender = props.itemRender(props.currentPage, 'all');
  const totalRender = props.showTotal(props.total);
  if (!totalPages || props.hideOnSinglePage && totalPages === 1) return null;
  const pages = fetchPageNumbers();

  const changePage = page => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    props.setCurrentPage(currentPage);
    props.onChange(currentPage, totalPages, props.pageSize, props.total);
  };

  const fastBackward = () => {
    const page = props.currentPage - props.pageNeighbours * 2 - 1;
    changePage(page);
  };

  const fastForward = () => {
    const page = props.currentPage + props.pageNeighbours * 2 + 1;
    changePage(page);
  };

  const backward = () => {
    changePage(props.currentPage - 1);
  };

  const forward = () => {
    changePage(props.currentPage + 1);
  };

  const changePageSize = size => {
    props.setPageSize(size);
    props.onShowSizeChange(props.currentPage, size);
  };

  const [simplePage, setSimplePage] = React.useState(props.currentPage);
  const [pageJumper, setPageJumper] = React.useState('');

  const simplePageUpdate = e => {
    e.preventDefault();

    if (isNaN(simplePage)) {
      setSimplePage(props.currentPage);
    } else {
      props.setCurrentPage(Math.max(0, Math.min(simplePage, totalPages)));
    }
  };

  const pageJumperUpdate = e => {
    e.preventDefault();

    if (isNaN(pageJumper)) {
      setPageJumper('');
    } else {
      props.setCurrentPage(Math.max(0, Math.min(pageJumper, totalPages)));
      setPageJumper('');
    }
  };

  return props.total > 0 && /*#__PURE__*/React.createElement(Box, props.paginationProps || {
    w: 'full',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(chakra.span, {
    mx: 1,
    my: "auto",
    fontSize: props.size,
    display: props.responsive && {
      base: !props.responsive.totalRender && 'none',
      sm: 'block'
    }
  }, totalRender), props.simple ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: simplePageUpdate
  }, /*#__PURE__*/React.createElement(Input, {
    textAlign: "center",
    isDisabled: props.disabled,
    my: "auto",
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm',
    w: props.size === 'lg' ? 50 : 10,
    value: simplePage,
    onChange: e => setSimplePage(e.target.value)
  })), /*#__PURE__*/React.createElement(chakra.span, {
    userSelect: "none",
    opacity: props.disabled ? 0.6 : 1,
    mx: 1,
    my: "auto",
    fontSize: props.size
  }, "/ 5")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PagButton, {
    as: allRender || prevRender,
    disabled: props.currentPage === 1 || props.disabled,
    onClick: backward,
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
  }, !prevRender && '<'), pages.map((page, index) => {
    if (page === 'LEFT') return /*#__PURE__*/React.createElement(Button, {
      as: allRender || rightRender,
      key: index,
      onClick: fastBackward,
      size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm',
      display: props.responsive && {
        base: !props.responsive.fastBackward && 'none',
        sm: 'block'
      },
      my: "auto"
    }, !leftRender && '<<');
    if (page === 'RIGHT') return /*#__PURE__*/React.createElement(Button, {
      as: allRender || rightRender,
      key: index,
      onClick: fastForward,
      size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm',
      display: props.responsive && {
        base: !props.responsive.fastForward && 'none',
        sm: 'block'
      },
      my: "auto"
    }, !rightRender && '>>');
    const active = page === props.currentPage;
    return /*#__PURE__*/React.createElement(PagButton, {
      as: allRender || pageRender,
      disabled: props.disabled,
      active: active,
      key: `page-${index}`,
      onClick: () => changePage(page),
      size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm',
      type: "page"
    }, page);
  }), /*#__PURE__*/React.createElement(PagButton, {
    as: allRender || nextRender,
    disabled: props.currentPage === totalPages || props.disabled,
    onClick: forward,
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
  }, !nextRender && '>')), props.showSizeChanger && /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(MenuButton, {
    display: props.responsive && {
      base: !props.responsive.pageSize && 'none',
      sm: 'block'
    }
  }, /*#__PURE__*/React.createElement(PagButton, {
    mx: 1,
    as: allRender || jumperRender || Button,
    disabled: props.disabled,
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
  }, props.pageSize, " / page")), /*#__PURE__*/React.createElement(MenuList, null, /*#__PURE__*/React.createElement(MenuOptionGroup, {
    onChange: changePageSize
  }, props.pageSizeOptions.filter(opt => opt !== props.pageSize).map((opt, oid) => /*#__PURE__*/React.createElement(MenuItemOption, {
    fontSize: props.size,
    value: opt.toString(),
    key: `size${oid}`
  }, opt, " / page"))))), props.showQuickJumper && /*#__PURE__*/React.createElement(HStack, {
    as: "form",
    userSelect: "none",
    opacity: props.disabled ? 0.6 : 1,
    onSubmit: pageJumperUpdate,
    display: props.responsive && {
      base: !props.responsive.pageJumper && 'none',
      sm: 'block'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    wordBreak: "unset"
  }, "Go to:"), /*#__PURE__*/React.createElement(Input, {
    width: "50px",
    value: pageJumper,
    isDisabled: props.disabled,
    onChange: e => setPageJumper(e.target.value),
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
  })));
};

const methods = ['itemRender', 'setCurrentPage'];
const nonMethods = Object.keys(defaultData).filter(k => !methods.includes(k));
const filterProps = props => {
  const validProps = nonMethods.reduce((acc, nxt) => {
    acc.push(props[nxt]);
    return acc;
  }, []);
  return React.useMemo(() => props, validProps);
};

const Pagination = props => {
  const defaultProps = React.useContext(PaginationContext);
  const allProps = { ...defaultProps,
    ...props
  };
  const [currentPage, setCurrentPage] = React.useState(allProps.current || allProps.defaultCurrent);
  React.useEffect(() => {
    props.current && setCurrentPage(props.current);
  }, [props.current]);
  const [pageSize, setPageSize] = React.useState(allProps.pageSize || allProps.defaultPageSize);
  const contextvalue = { ...allProps
  };
  const value = React.useMemo(() => {
    return { ...contextvalue,
      currentPage,
      setCurrentPage,
      pageSize,
      setPageSize
    };
  }, [filterProps(contextvalue), currentPage, pageSize]);
  return /*#__PURE__*/React.createElement(PaginationContext.Provider, {
    value: value
  }, /*#__PURE__*/React.createElement(PaginationComp, null));
};

export default Pagination;
//# sourceMappingURL=index.modern.js.map
