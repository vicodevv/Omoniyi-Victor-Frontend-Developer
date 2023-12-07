/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

const SPACEX_API_BASE = 'https://api.spacexdata.com/v3';

type GetCapsulesFunction = (query?: { [key: string]: string | undefined }, enabled?: boolean) => Promise<any>;

export const SpaceXService = {
  getCapsules: async (
    query?: { [key: string]: string | undefined },
    enabled = true
  ): Promise<any> => {
    try {
      // Only make the API call if enabled is true
      if (enabled) {
        const response = await axios.get(`${SPACEX_API_BASE}/capsules`, { params: query });
  
        const capsulesWithId = response.data.map((capsule: any, index: number) => ({
          ...capsule,
          id: index + 1,
        }));
  
        return capsulesWithId;
      }
  
      // Return an empty array when not making the API call
      return [];
    } catch (error) {
      console.error('Error fetching capsules:', error);
      throw error;
    }
  },
  

  useGetCapsules: (
    query?: { [key: string]: string | undefined },
    enabled?: boolean,
    options?: UseQueryOptions<any, unknown, any, 'capsules'>
  ): UseQueryResult<any, unknown> => {
    return useQuery('capsules', () => SpaceXService.getCapsules(query, enabled), options);
  },
  
};
