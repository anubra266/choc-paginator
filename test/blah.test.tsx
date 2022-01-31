import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pagination from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Pagination
        defaultCurrent={5}
        total={500}
        paginationProps={{ display: 'flex' }}
        pageNeighbours={2}
        basePath="https://carplanner.com/?pagina="
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
