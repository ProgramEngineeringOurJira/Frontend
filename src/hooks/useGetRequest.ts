import React from 'react';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import HttpService from '../services/main.services';

export type GetRequestReturnT = ReturnType<typeof useGetRequest>;

export const useGetRequest = (cb: (data?: any) => void, endpoint: string) => {
  const [queryResult, setQueryResult] = React.useState<string | null>(null);

  const { isLoading, mutate, isError, isSuccess } = useMutation<AxiosResponse<any> | undefined, AxiosError, any>(
    async <T>(data?: T) => {
      setQueryResult(null);

      return await HttpService.get(endpoint, data);
    },
    {
      onSuccess: (res) => {
        setQueryResult(res!.data);
        cb(res!.data);
      },
      onError: (err: AxiosError) => {
        setQueryResult(err.message);
      }
    }
  );

  return { queryResult, isLoading, mutate, isError, isSuccess };
};
