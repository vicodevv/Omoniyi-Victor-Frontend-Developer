/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, waitFor } from '@testing-library/react';
import Search from './index';

const mockGetCapsules = jest.fn();

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: () => ({
    data: [],
    isLoading: false,
    isError: false,
  }),
}));

jest.mock('../../service/spaceXService', () => ({
  ...jest.requireActual('../../service/spaceXService'),
  SpaceXService: {
    getCapsules: mockGetCapsules,
  },
}));

test('renders Search component', async () => {
  const { getByText } = render(<Search />);
  const searchButton = getByText(/Search/i);
  
  fireEvent.click(searchButton);
  await waitFor(() => expect(mockGetCapsules).toHaveBeenCalledTimes(1));

});
