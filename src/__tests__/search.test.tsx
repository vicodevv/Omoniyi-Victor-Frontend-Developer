import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Search from '../components/search';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockGetCapsules = jest.fn();

const queryClient = new QueryClient();
test('renders Search component', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
  const searchButton = screen.getByRole('button', { name: /Search/i });

  fireEvent.click(searchButton);
  
  await waitFor(() => expect(mockGetCapsules).toHaveBeenCalledTimes(0));
});
