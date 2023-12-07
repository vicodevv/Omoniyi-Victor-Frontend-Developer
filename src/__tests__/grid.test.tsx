import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResultGrid from '../components/grid/index';

const testData = [
  { id: 1, capsule_serial: 'C101', status: 'retired' },
  { id: 2, capsule_serial: 'C102', status: 'retired' },
];

test('renders ResultGrid component with data', () => {
  render(<ResultGrid data={testData} itemsPerPage={10} onItemClick={() => {}} />);
  const capsuleElement = screen.getByText(/C101/i);
  expect(capsuleElement).toBeInTheDocument();
});
