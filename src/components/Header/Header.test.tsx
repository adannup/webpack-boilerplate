import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('<Header />', () => {
  it('should render h1 element', () => {
    const props = {
      title: 'hello world',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper).toMatchInlineSnapshot(`
      <h1>
        hello world
      </h1>
    `);
  });
});
