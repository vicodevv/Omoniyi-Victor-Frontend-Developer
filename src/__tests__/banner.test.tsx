import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Banner from '../components/banner';

test('full app rendering/navigating', () => {
  render(<Banner />);
  expect(screen.getByText(/Elevating Humanity Beyond Earth's Limits/i)).toBeInTheDocument();
});




