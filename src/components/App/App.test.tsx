import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
  it('render App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchInlineSnapshot(`
      <div>
        <Header
          title="Webpack Configuration"
        />
        <p>
          Webpack + ReactJS + TypeScript
        </p>
      </div>
    `);
  });
});
