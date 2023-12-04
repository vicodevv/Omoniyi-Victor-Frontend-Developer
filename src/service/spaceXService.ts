/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

const SPACEX_API_BASE = 'https://api.spacexdata.com/v3';

type GetCapsulesFunction = (query?: { [key: string]: string | undefined }) => Promise<any>;

export const SpaceXService = {

//   getCapsules: async (query?: { [key: string]: string | undefined }): Promise<any> => {
//     try {
//       const response = await axios.get(`${SPACEX_API_BASE}/capsules`, { params: query });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching capsules:', error);
//       throw error;
//     }
//   },

  getCapsules: async (query?: { [key: string]: string | undefined }): Promise<any> => {
    try {
      const response = await axios.get(`${SPACEX_API_BASE}/capsules`, { params: query });
  
      const capsulesWithId = response.data.map((capsule: any, index: number) => ({
        ...capsule,
        id: index + 1,
      }));
  
      return capsulesWithId;
    } catch (error) {
      console.error('Error fetching capsules:', error);
      throw error;
    }
  },

  useGetCapsules: (
    query?: { [key: string]: string | undefined },
    options?: UseQueryOptions<any, unknown, any, 'capsules'>
  ): UseQueryResult<any, unknown> => {
    return useQuery('capsules', () => SpaceXService.getCapsules(query), options);
  },
};
