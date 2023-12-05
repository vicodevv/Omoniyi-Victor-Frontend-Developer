/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import ResultGrid from './index';

const testData = [
  { id: 1, capsule_serial: 'C101', status: 'retired' },
  { id: 2, capsule_serial: 'C102', status: 'retired' },
];

test('renders ResultGrid component with data', () => {
  const { getByText } = render(<ResultGrid data={testData} itemsPerPage={10} onItemClick={() => {}} />);
  const capsuleElement = getByText(/C101/i);
  expect(capsuleElement).toBeInTheDocument();
});
