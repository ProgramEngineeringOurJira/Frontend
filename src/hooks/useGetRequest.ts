import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import HttpService from '../services/main.services';

export type GetRequestReturnT = ReturnType<typeof useGetRequest>;

async function fetchData<T>(endpoint: string): Promise<AxiosResponse<T> | undefined> {
  
  return await HttpService.get(endpoint);
  
}

export const useGetRequest = <T>(endpoint: string) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint).then((res) => res?.data as T),
  });
};
