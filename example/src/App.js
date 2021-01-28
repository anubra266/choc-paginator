import React from 'react'

import Pagination from 'choc-paginator'
import 'choc-paginator/dist/index.css'
import { useColorMode, Button, Stack } from '@chakra-ui/react'

const Section = (props) => (
  <Stack
    spacing={5}
    bg='gray.600'
    p={10}
    w='full'
    direction='column'
    alignItems='center'
  >
    <h3>{props.title} </h3>
    {props.children}
  </Stack>
)

const Next = (props) => {
  return (
    <Button {...props} colorScheme='yellow' variant='outline'>
      {' '}
      Next{' '}
    </Button>
  )
}
const Page = (props) => {
  return <Button mx={1} {...props} colorScheme='yellow' variant='outline' />
}
const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const itemRender = (_, type) => {}
  return (
    <div>
      <Section title=''>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Section>
      <Section title='Basic Pagination'>
        <Pagination
          defaultCurrent={1}
          total={100}
          onChange={(page) => console.log(page)}
          pageNeighbours={1}
          itemRender={itemRender}
          showSizeChanger
          size='sm'
          showTotal={(total) => `${total} Items`}
          hideOnSinglePage
          simple={false}
          activeStyles={{ bg: 'green.800', cursor: 'pointer' }}
          paginationProps={{ display: 'flex' }}
        />
      </Section>

      {/*<Section title='Custom Styling'>
        <Pagination
          defaultCurrent={1}
          total={50}
          size='md'
          activeStyles={{ bg: 'yellow.800', cursor: 'pointer' }}
          baseStyles={{ bg: 'yellow.600', color: 'white', rounded: 'md' }}
        />
        <b>NB:</b>
        <li>The Styles are Chakra Style Props </li>
        <li>
          When hoverStyles prop is not present, activeStyles takes it place.
        </li>
  </Section>*/}
    </div>
  )
}

export default App
