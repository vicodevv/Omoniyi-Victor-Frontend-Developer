import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../components/header/index';

test('renders Header component', () => {
  render(<Header />);
  expect(screen.getByAltText(/SpaceX/i)).toBeInTheDocument();
});
