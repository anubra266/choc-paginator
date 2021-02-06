function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var react = require('@chakra-ui/react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var defaultData = {
  current: null,
  defaultCurrent: 1,
  defaultPage: 1,
  defaultPageSize: 10,
  disabled: false,
  hideOnSinglePage: false,
  itemRender: function itemRender() {
    return null;
  },
  pageSize: null,
  pageNeighbours: 0,
  pageSizeOptions: [10, 20, 50, 100],
  paginationProps: null,
  responsive: false,
  showQuickJumper: false,
  showSizeChanger: null,
  showTotal: function showTotal() {
    return '';
  },
  simple: null,
  total: 0,
  onChange: function onChange() {
    return '';
  },
  onShowSizeChange: function onShowSizeChange() {
    return '';
  },
  size: 'md',
  rounded: 'md',
  baseStyles: null,
  activeStyles: null,
  hoverStyles: null,
  colorScheme: 'brand'
};
var PaginationContext = React.createContext(_extends({}, defaultData));

var usePaginationStyles = function usePaginationStyles(props) {
  var _React$useContext = React.useContext(PaginationContext),
      colorScheme = _React$useContext.colorScheme,
      rounded = _React$useContext.rounded,
      size = _React$useContext.size,
      baseStyles = _React$useContext.baseStyles,
      activeStyles = _React$useContext.activeStyles,
      hoverStyles = _React$useContext.hoverStyles;

  var activeStyle = activeStyles || {
    bg: react.useColorModeValue(colorScheme + ".600", colorScheme + ".500"),
    color: react.useColorModeValue('white', 'gray.200'),
    cursor: 'pointer'
  };
  var hoverStyle = !props.disabled && {
    _hover: hoverStyles || activeStyle
  };
  var baseStyle = baseStyles || {
    rounded: rounded,
    bg: react.useColorModeValue('white', 'gray.800'),
    color: react.useColorModeValue('gray.700', 'gray.200'),
    userSelect: 'none'
  };

  var getSizeStyle = function getSizeStyle(size) {
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

  var sizeStyle = getSizeStyle(size);
  var disabledStyle = {
    opacity: 0.6,
    cursor: 'not-allowed'
  };
  return _extends({}, sizeStyle, baseStyle, hoverStyle, props.active && activeStyle, props.disabled && disabledStyle);
};

var handleResponsive = function handleResponsive(props) {
  var type = props.type,
      active = props.active,
      responsive = props.responsive;
  var show = true;

  switch (type) {
    case 'page':
      if (!active) show = false;else if (!responsive.activePage) show = false;
      break;
  }

  return !show && 'none';
};

var PagButton = function PagButton(props) {
  var _React$useContext = React.useContext(PaginationContext),
      responsive = _React$useContext.responsive;

  var paginationStyles = usePaginationStyles(props);
  var display = responsive && handleResponsive(_extends({}, props, {
    responsive: responsive
  }));
  return /*#__PURE__*/React.createElement(react.Button, _extends({
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

var LEFT_PAGE = 'LEFT';
var RIGHT_PAGE = 'RIGHT';

var range = function range(from, to, step) {
  if (step === void 0) {
    step = 1;
  }

  var i = from;
  var range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

var fetchPageNumbers = function fetchPageNumbers() {
  var props = React.useContext(PaginationContext);
  var totalPages = Math.ceil(props.total / props.pageSize);
  var currentPage = props.currentPage;
  var pageNeighbours = props.pageNeighbours;
  var totalNumbers = pageNeighbours * 2 + 3;
  var totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    var startPage = Math.max(2, currentPage - pageNeighbours);
    var endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    var pages = range(startPage, endPage);
    var hasLeftSpill = startPage > 2;
    var hasRightSpill = totalPages - endPage > 1;
    var spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      case hasLeftSpill && !hasRightSpill:
        {
          var extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE].concat(extraPages, pages);
          break;
        }

      case !hasLeftSpill && hasRightSpill:
        {
          var _extraPages = range(endPage + 1, endPage + spillOffset);

          pages = [].concat(pages, _extraPages, [RIGHT_PAGE]);
          break;
        }

      case hasLeftSpill && hasRightSpill:
      default:
        {
          pages = [LEFT_PAGE].concat(pages, [RIGHT_PAGE]);
          break;
        }
    }

    return [1].concat(pages, [totalPages]);
  }

  return range(1, totalPages);
};

var PaginationComp = function PaginationComp() {
  var props = React.useContext(PaginationContext);
  var totalPages = Math.ceil(props.total / props.pageSize);
  var prevRender = props.itemRender(props.currentPage, 'prev');
  var nextRender = props.itemRender(props.currentPage, 'next');
  var leftRender = props.itemRender(props.currentPage, 'backward');
  var rightRender = props.itemRender(props.currentPage, 'forward');
  var jumperRender = props.itemRender(props.currentPage, 'jumper');
  var pageRender = props.itemRender(props.currentPage, 'page');
  var allRender = props.itemRender(props.currentPage, 'all');
  var totalRender = props.showTotal(props.total);
  if (!totalPages || props.hideOnSinglePage && totalPages === 1) return null;
  var pages = fetchPageNumbers();

  var changePage = function changePage(page) {
    var currentPage = Math.max(0, Math.min(page, totalPages));
    props.setCurrentPage(currentPage);
    props.onChange(currentPage, totalPages, props.pageSize, props.total);
  };

  var fastBackward = function fastBackward() {
    var page = props.currentPage - props.pageNeighbours * 2 - 1;
    changePage(page);
  };

  var fastForward = function fastForward() {
    var page = props.currentPage + props.pageNeighbours * 2 + 1;
    changePage(page);
  };

  var backward = function backward() {
    changePage(props.currentPage - 1);
  };

  var forward = function forward() {
    changePage(props.currentPage + 1);
  };

  var changePageSize = function changePageSize(size) {
    props.setPageSize(size);
    props.onShowSizeChange(props.currentPage, size);
  };

  var _React$useState = React.useState(props.currentPage),
      simplePage = _React$useState[0],
      setSimplePage = _React$useState[1];

  var _React$useState2 = React.useState(''),
      pageJumper = _React$useState2[0],
      setPageJumper = _React$useState2[1];

  var simplePageUpdate = function simplePageUpdate(e) {
    e.preventDefault();

    if (isNaN(simplePage)) {
      setSimplePage(props.currentPage);
    } else {
      props.setCurrentPage(Math.max(0, Math.min(simplePage, totalPages)));
    }
  };

  var pageJumperUpdate = function pageJumperUpdate(e) {
    e.preventDefault();

    if (isNaN(pageJumper)) {
      setPageJumper('');
    } else {
      props.setCurrentPage(Math.max(0, Math.min(pageJumper, totalPages)));
      setPageJumper('');
    }
  };

  return props.total > 0 && /*#__PURE__*/React.createElement(react.Box, props.paginationProps || {
    w: 'full',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(react.chakra.span, {
    mx: 1,
    my: "auto",
    fontSize: props.size,
    display: props.responsive && {
      base: !props.responsive.totalRender && 'none',
      sm: 'block'
    }
  }, totalRender), props.simple ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: simplePageUpdate
  }, /*#__PURE__*/React.createElement(react.Input, {
    textAlign: "center",
    isDisabled: props.disabled,
    my: "auto",
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm',
    w: props.size === 'lg' ? 50 : 10,
    value: simplePage,
    onChange: function onChange(e) {
      return setSimplePage(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(react.chakra.span, {
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
  }, !prevRender && '<'), pages.map(function (page, index) {
    if (page === 'LEFT') return /*#__PURE__*/React.createElement(react.Button, {
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
    if (page === 'RIGHT') return /*#__PURE__*/React.createElement(react.Button, {
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
    var active = page === props.currentPage;
    return /*#__PURE__*/React.createElement(PagButton, {
      as: allRender || pageRender,
      disabled: props.disabled,
      active: active,
      key: "page-" + index,
      onClick: function onClick() {
        return changePage(page);
      },
      size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm',
      type: "page"
    }, page);
  }), /*#__PURE__*/React.createElement(PagButton, {
    as: allRender || nextRender,
    disabled: props.currentPage === totalPages || props.disabled,
    onClick: forward,
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
  }, !nextRender && '>')), props.showSizeChanger && /*#__PURE__*/React.createElement(react.Menu, null, /*#__PURE__*/React.createElement(react.MenuButton, {
    display: props.responsive && {
      base: !props.responsive.pageSize && 'none',
      sm: 'block'
    }
  }, /*#__PURE__*/React.createElement(PagButton, {
    mx: 1,
    as: allRender || jumperRender || react.Button,
    disabled: props.disabled,
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
  }, props.pageSize, " / page")), /*#__PURE__*/React.createElement(react.MenuList, null, /*#__PURE__*/React.createElement(react.MenuOptionGroup, {
    onChange: changePageSize
  }, props.pageSizeOptions.filter(function (opt) {
    return opt !== props.pageSize;
  }).map(function (opt, oid) {
    return /*#__PURE__*/React.createElement(react.MenuItemOption, {
      fontSize: props.size,
      value: opt.toString(),
      key: "size" + oid
    }, opt, " / page");
  })))), props.showQuickJumper && /*#__PURE__*/React.createElement(react.HStack, {
    as: "form",
    userSelect: "none",
    opacity: props.disabled ? 0.6 : 1,
    onSubmit: pageJumperUpdate,
    display: props.responsive && {
      base: !props.responsive.pageJumper && 'none',
      sm: 'flex'
    }
  }, /*#__PURE__*/React.createElement(react.Text, {
    wordBreak: "unset"
  }, "Go to:"), /*#__PURE__*/React.createElement(react.Input, {
    width: "50px",
    value: pageJumper,
    isDisabled: props.disabled,
    onChange: function onChange(e) {
      return setPageJumper(e.target.value);
    },
    size: props.size === 'lg' ? 'md' : props.size === 'xs' ? 'xs' : 'sm'
  })));
};

var methods = ['itemRender', 'setCurrentPage'];
var nonMethods = Object.keys(defaultData).filter(function (k) {
  return !methods.includes(k);
});
var filterProps = function filterProps(props) {
  var validProps = nonMethods.reduce(function (acc, nxt) {
    acc.push(props[nxt]);
    return acc;
  }, []);
  return React.useMemo(function () {
    return props;
  }, validProps);
};

var Pagination = function Pagination(props) {
  var defaultProps = React.useContext(PaginationContext);

  var allProps = _extends({}, defaultProps, props);

  var _React$useState = React.useState(allProps.current || allProps.defaultCurrent),
      currentPage = _React$useState[0],
      setCurrentPage = _React$useState[1];

  React.useEffect(function () {
    props.current && setCurrentPage(props.current);
  }, [props.current]);

  var _React$useState2 = React.useState(allProps.pageSize || allProps.defaultPageSize),
      pageSize = _React$useState2[0],
      setPageSize = _React$useState2[1];

  var contextvalue = _extends({}, allProps);

  var value = React.useMemo(function () {
    return _extends({}, contextvalue, {
      currentPage: currentPage,
      setCurrentPage: setCurrentPage,
      pageSize: pageSize,
      setPageSize: setPageSize
    });
  }, [filterProps(contextvalue), currentPage, pageSize]);
  return /*#__PURE__*/React.createElement(PaginationContext.Provider, {
    value: value
  }, /*#__PURE__*/React.createElement(PaginationComp, null));
};

module.exports = Pagination;
//# sourceMappingURL=index.js.map
