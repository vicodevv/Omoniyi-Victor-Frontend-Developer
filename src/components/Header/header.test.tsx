/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import Header from './index';

test('renders Header component', () => {
  const { getByAltText } = render(<Header />);
  const logoElement = getByAltText(/SpaceX/i);
  expect(logoElement).toBeInTheDocument();
});
