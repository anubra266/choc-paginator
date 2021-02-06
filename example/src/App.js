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

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
      <Section title=''>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Section>
      <Section title='All Pagination'>
        <Pagination
          defaultCurrent={2}
          total={50}
          paginationProps={{ display: 'flex', mb: 5 }}
          responsive
        />
      </Section>
      <Section title='All Pagination'>
        <Pagination
          defaultCurrent={1}
          total={500}
          onChange={(page) => console.log(page)}
          pageNeighbours={1}
          showSizeChanger
          size='sm'
          showTotal={(total) => `${total} Items`}
          hideOnSinglePage
          simple={false}
          activeStyles={{ bg: 'green.800', cursor: 'pointer' }}
          paginationProps={{ display: 'flex' }}
          showQuickJumper
          responsive={{
            activePage: true,
            totalRender: false,
            fastBackward: false,
            fastForward: false,
            pageSize: false,
            pageJumper: false
          }}
        />
      </Section>
    </div>
  )
}

export default App
