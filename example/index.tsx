import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pagination from '../.';
import {
  Button,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  useToast,
  VStack,
} from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#ecefff',
    100: '#cbceeb',
    200: '#a9aed6',
    300: '#888ec5',
    400: '#666db3',
    500: '#4d5499',
    600: '#3c4178',
    700: '#2a2f57',
    800: '#181c37',
    900: '#080819',
  },
};
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

const App = () => {
  const toast = useToast();
  const Prev = React.forwardRef((props: any, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ));
  const Next = React.forwardRef((props: any, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ));
  const Page = React.forwardRef((props: any, ref) => (
    <Button ref={ref} {...props}>
      P{props.children}
    </Button>
  ));
  const All = React.forwardRef((props: any, ref) => (
    <Button ref={ref} {...props}>
      {props.children}
    </Button>
  ));

  const itemRender = (p: any, type: string) => {
    if (type === 'prev') {
      return React.forwardRef((props: any, ref) => (
        <Button ref={ref} {...props}>
          Prev {p}
        </Button>
      ));;
    }
    if (type === 'next') {
      return React.forwardRef((props: any, ref) => (
        <Button ref={ref} {...props}>
          Next {p}
        </Button>
      ));;
    }
    if (type === 'page') {
      return Page;
    }
    if (type === 'pageSize') {
      return All;
    }
  };

  return (
    <VStack py="5" spacing="5">
      {/* <Pagination
        defaultCurrent={1}
        total={50}
        paginationProps={{ display: 'flex' }}
        onChange={(page: any) =>
          toast({
            title: 'Pagination.',
            description: `You just changed to page ${page}.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
        
      />

      <Pagination
        defaultCurrent={5}
        total={500}
        paginationProps={{ display: 'flex' }}
        pageNeighbours={2}
      /> */}

      <Pagination
        defaultCurrent={5}
        total={500}
        paginationProps={{ display: 'flex' }}
        showSizeChanger
        focusRing="green"
        itemRender={itemRender}
      />

      <Pagination
        defaultCurrent={9}
        total={500}
        paginationProps={{ display: 'flex' }}
        pageNeighbours={1}
        showQuickJumper
      />
      {/* 
      {['xs', 'sm', 'md', 'lg'].map((size, key) => (
        <Pagination
          key={key}
          defaultCurrent={9}
          total={500}
          paginationProps={{ display: 'flex', mb: 4 }}
          pageNeighbours={1}
          size={size}
        />
      ))}

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex', mb: 4 }}
        simple
      />

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex', mb: 4 }}
        simple
        disabled
      />

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex', mb: 4 }}
        showTotal={total => `${total} Items`}
      />

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex', mb: 4 }}
        showTotal={(total: number) => <Button>{`${total} Items`}</Button>}
      />

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex', mb: 4 }}
        itemRender={itemRender}
      />

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex' }}
        colorScheme="yellow"
        rounded="full"
      />

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex' }}
        baseStyles={{ bg: 'green.600' }}
        activeStyles={{ bg: 'blue.900' }}
        hoverStyles={{ bg: 'green.300' }}
      />

      <Pagination
        defaultCurrent={2}
        total={50}
        paginationProps={{ display: 'flex', mb: 5 }}
        responsive
      />
      <Pagination
        defaultCurrent={9}
        total={500}
        paginationProps={{ display: 'flex', mb: 5 }}
        pageNeighbours={1}
        showTotal={total => `${total} Items`}
        showSizeChanger
        showQuickJumper
        responsive={{ activePage: true }}
      />*/}
    </VStack>
  );
};

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
