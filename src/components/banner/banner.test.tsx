/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import Banner from './index';

test('renders Banner component', () => {
  const { getByText } = render(<Banner />);
  const titleElement = getByText(/Elevating Humanity Beyond Earth's Limits/i);
  expect(titleElement).toBeInTheDocument();
});
