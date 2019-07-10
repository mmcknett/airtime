import React from 'react';
import renderer from 'react-test-renderer';

import { Airpad } from '../Airpad';

it(`renders correctly`, () => {
  const tree = renderer.create(<Airpad />).toJSON();

  expect(tree).toMatchSnapshot();
});
